const {
	addBook,
	getAllBooks,
	getBook,
	updateBook,
	deleteBook,
} = require('./handlers');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooks,
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: getBook,
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: updateBook,
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: deleteBook,
	},
];

module.exports = routes;
