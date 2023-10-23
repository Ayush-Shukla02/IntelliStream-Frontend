import axios from "axios";

export const tmdbBaseURL = "https://api.themoviedb.org/3/movie/";
export const lambdaMovieURL =
	"https://wwirbvcvlahqvbf5orxcxd2eeq0mqkho.lambda-url.ap-south-1.on.aws/";
export const lambdaUserURL =
	"https://scygmhb6obxns6ui3ubgwpeabm0sydit.lambda-url.ap-south-1.on.aws/";
export const lambdaGenreURL =
	"https://cued76joemzserq6inuzefttta0hdaxx.lambda-url.ap-south-1.on.aws/";

// // Verify the user's JWT token
// export const validateUserJWTToken = async (token) => {
// 	try {
// 		const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 			},
// 		});

// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// Get recommended movies from recommender and the TMDB movie ID
// export const getMovie = async () => {
// 	fetch(
// 		`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
// 	)
// 		.then((res) => res.json())
// 		.then((data) => );

// try {
// 	console.log("entered getMovie");
// 	const res = await axios.get(
// 		`${tmdbBaseURL}/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
// 	);

// 	console.log("res.data: ");

// 	console.log(res.data);
// 	return res.data;
// } catch (err) {
// 	console.log("Error: ", err.message);
// 	return null;
// }
// };

// // Get all products from the database
// export const getAllProducts = async () => {
// 	try {
// 		const res = await axios.get(`${baseURL}/api/products/all`);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Delete a product from the database
// export const deleteProduct = async (productId) => {
// 	try {
// 		const res = await axios.delete(
// 			`${baseURL}/api/products/delete/${productId}`
// 		);

// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Get user details from the database
// export const getAllUsers = async () => {
// 	try {
// 		const res = await axios.get(`${baseURL}/api/users/all`);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Add Item to the cart
// export const addNewItemToCart = async (user_id, data) => {
// 	try {
// 		const res = await axios.post(
// 			`${baseURL}/api/products/addToCart/${user_id}`,
// 			{ ...data }
// 		);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Get all items from the cart
// export const getAllCartItems = async (user_id) => {
// 	try {
// 		const res = await axios.get(
// 			`${baseURL}/api/products/getCartItems/${user_id}`
// 		);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Cart Increment, Decrement
// export const increaseItemQuantity = async (user_id, product_id, type) => {
// 	try {
// 		const res = await axios.post(
// 			`${baseURL}/api/products/updateCart/${user_id}`,
// 			null,
// 			{ params: { productId: product_id, type: type } }
// 		);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Get all orders
// export const getAllOrders = async () => {
// 	try {
// 		const res = await axios.get(`${baseURL}/api/products/orders`);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };

// // Update order status
// export const updateOrderSts = async (order_id, sts) => {
// 	try {
// 		const res = await axios.post(
// 			`${baseURL}/api/products/updateOrder/${order_id}`,
// 			null,
// 			{ params: { sts: sts } }
// 		);
// 		return res.data.data;
// 	} catch (err) {
// 		return null;
// 	}
// };
