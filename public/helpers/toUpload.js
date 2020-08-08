const toUpload = (cloudinary, req) => {
    const promise = new Promise((resolve, reject) => {
        if (!req.file) { reject(false) }
        cloudinary.uploader.upload(req.file.path, function (result) {
            if (!result) { reject(error) }
            else { resolve(result) }
        })
    })
    promise.then(result => { return result })
    promise.catch(error => { return error })
    return promise;
}

module.exports = toUpload;