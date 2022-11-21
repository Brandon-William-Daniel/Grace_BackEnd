API Routes
    Users --William
        POST -- /register Create New User
        POST -- /login Login User
        GET -- /me Verified the user. Getting everything for the logged in user
        GET -- /:username/orders Pull everything for this user
    Products -- Daniel
        POST -- /createProduct Only Admin
        GET -- / Get active products
        DELETE -- /setInactive Set post to active
        PATCH --/updateProduct Update Current Product
    Reviews -- Brandon
        POST -- /:product/review Post a review
        GET -- /:product/
        DELETE --/:product/delete removes the review from the post Must match userId
        PATCH -- /:product/update Updates review Must match userId
    Orders -- Cade
        POST -- /
        GET -- / View Cart must match userID
        DELETE -- Remove the item from cart
    
BackEnd
    Seed --Builds the initial Database
    Index -- Require and export modules
    Client -- attaches the client
    Users -- William
        createUser
        getUserById
        getUserByUsername
        getAllUsers --Admins to see all users 
        getUserInfo-- collects all info for a logged in user
    Products -- Daniel
        createProduct
        getProductById
        getProductByCatagory
        getAllProducts
        destroyProduct
        updateProduct
        addProductToCart
        buySingleProductNow
    Reviews -- Brandon
        getAllReviewsByProduct
        getAllReviewsByUser
        updateReview
        destroyReview
        createReview
    Orders -- Cade
        clearCart
        subtractFromQtyByProductId
        removeItem
        updateOrder



