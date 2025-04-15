const Listing = require("../models/listing");

module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
      }

      module.exports.renderNewFrom=  (req, res) => {
        console.log("New listing route hit");
        res.render("listings/new");
      }

      module.exports.showListing=async(req, res) => {
        let { id } = req.params;
        const listing = await Listing.findById(req.params.id).populate("reviews").populate("owner");
      if(!listing){
        req.flash("error", "Listing you requested for does not exist!");
      return res.redirect("/listings")
      }
      console.log(listing)
      return res.render("./listings/show", { listing });
        }

    module.exports.createListing=async (req, res,next) => {
      let url= req.file.path;
      let filename =req.file.filename;
            const newListing = new Listing(req.body.listing);
            newListing.owner=req.user._id
            newListing.image={url,filename};
            await newListing.save();
           req.flash("success", "New listing Created");
          return  res.redirect("/listings");
          }

    module.exports.editListing=async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let originalImageUrl =listing.image.url;
    originalImageUrl  =originalImageUrl.replace("/upload","upload/w_200");
    res.render("listings/edit", { listing,originalImageUrl });
}

module.exports.updateListing= async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefine"){
    let url= req.file.path;
    let filename =req.file.filename;
    listing.image={url,filename}
    listing.save();
  }
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
  }

  module.exports.destroyListing=async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    req.flash("success", " Listing Deleted");
    res.redirect("/listings");
    }