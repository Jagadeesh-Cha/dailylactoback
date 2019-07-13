const completeMegCode = Object.freeze({
    en: Object.freeze({
        ERROR: Object.freeze({
            invalidRequest: "Invalid request body",
            emptyFields: "All fields are empty!",
            contentType: "The content-type of the header mismatches the supported server response!",
            headerType: "The accepted header mismatches the supported response!",
            errorProcessingRequest: "Requested endpoint is not appropriate",
            endpointNotFound: "Requested endpoint not found!",
            sigint: "Caught interrupt signal. Exiting!"
        }),
        SUCCESS: Object.freeze({
            ok: "Success",
            serviceStopped: "Node server stopped",
            mongooseDisconnect: "Node mongoose connection closed"
        })
    })
})

module.exports = {
    messages: completeMegCode.en
}
