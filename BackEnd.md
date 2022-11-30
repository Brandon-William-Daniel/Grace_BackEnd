API Routes--
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



Cart -- Thursday Morning -- William
CSS for the entire site
Profile Page -- Backend/Frontend --Friday
    Frontend -- Cade
    Current Cart
    Previous Carts
CSS for NAVBAR -- Thursday Morning -- Brandon
Guest Cart
requireAdmin function -- Daniel 
    putting that in the correct areas on the api
        add product
        edit product
        delete product
        make a user an admin (optional)
        see all users as an admin
    Frontend Admin area
    

seedData
    --Create user function needs create intial order function
orders DB -- needs create order function
        -- needs orderDetails join to orderLine function
        -- getAllCart
        -- getActiveCart

orders API -- DELETE orderDetails or PATCH orderLine -- removes one item   from the cart
            --GET get all orders for a user
            --GET active cart for a user
            --DELETE orderLine --user buys cart. Sets current cart to false and creates a new cart.
            --PATCH orderDetails user changes quantity of an item in a cart.
            --PATCH orderLine removes an item from the cart
            

SELECT *
FROM "orderLine"
INNER JOIN "orderDetails"
WHERE "orderLine.userId" = "orderDetails.userId" AND "orderLine.current" = true; 




