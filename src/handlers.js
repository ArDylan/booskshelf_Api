const {
	nanoid,
} = require('nanoid');

const books = require('./books');

// fitur add Book
const addBook = (request, pm) => {
	const {
		name,
		year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
	} = request.payload;
	const id = nanoid(16);

	if(!name){
		const response = pm.response({
			status : 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}
	if(readPage > pageCount){
		const response = pm.response({
			status : 'fail',
			message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}

	const finished = pageCount === readPage;

	const insertedAt = new Date().toISOString();
	const updatedAt = new Date().toISOString();

	books.push({
		id,
		name,
		year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        finished,
		insertedAt,
		updatedAt,
	});

	// check if exist
	if (books.filter((book) => book.id === id).length > 0) {
		const response = pm.response({
			status: 'success',
			message: 'Buku berhasil ditambahkan',
			data: {
				bookId: id,
			},
		});
		response.code(201);
		return response;
	}

	const response = pm.response({
		status: 'fail',
		message: 'Buku gagal ditambahkan',
	});
	response.code(500);
	return response;
};

// fitur getAllBooks
const getAllBooks = (request, pm) => {
	// get property
	const {
		name,
		reading,
		finished,
	} = request.query;
	if (name){
		const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
		const response = pm.response({
			status: 'success',
			data: {
				books: filteredBooks.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	else if (reading){
		const filteredBooks = books.filter((book) => Number(book.reading) === Number(reading));
		const response = pm.response({
			status: 'success',
			data: {
				books: filteredBooks.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	else if (finished){
		const filteredBooks = books.filter((book) => Number(book.finished) === Number(finished));
		const response = pm.response({
			status: 'success',
			data: {
				books: filteredBooks.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	}
	else{
		const response = pm.response({
			status: 'success',
			data: {
				books: books.map((book) => ({
					id: book.id,
					name: book.name,
					publisher: book.publisher,
				})),
			},
		});
		response.code(200);
		return response;
	};
}

const getBook = (request, pm) => {
	const {
		id,
	} = request.params;
	const book = books.filter((data) => data.id === id)[0];
	if (book) {
		return {
			status: 'success',
			data: {
				book,
			},
		};
	}
	const response = pm.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
	response.code(404);
	return response;
};


//fitur update Book
const updateBook = (request, pm) => {
	const {
		id,
	} = request.params;

	const {
		name,
		year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
	} = request.payload;

	if(!name){
		const response = pm.response({
			status : 'fail',
			message: 'Gagal memperbarui buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}
	if(readPage > pageCount){
		const response = pm.response({
			status : 'fail',
			message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}
	const finished = pageCount === readPage;
	const updatedAt = new Date().toISOString();
	const index = books.findIndex((book) => book.id === id);
	if (index > -1) {
		books[index] = {
			...books[index],
			name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            finished,
			updatedAt,
		};
		const response = pm.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}
	const response = pm.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

//fitur Delete Book
const deleteBook = (request, pm) => {
	const {
		id,
	} = request.params;
	const index = books.findIndex((book) => book.id === id);
	if (index > -1) {
		books.splice(index, 1);
		const response = pm.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = pm.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};


module.exports = {
	addBook,
	getAllBooks,
	getBook,
	updateBook,
	deleteBook,
};
