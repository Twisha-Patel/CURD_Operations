let books = [];
let currentSortType = "asc";
let currentSortKey = "";

function submitData() {
  let rowId = document.getElementById("rowid").value;

  if (rowId) {
    //for updating existing data on save

    const rowindex = books.findIndex((book) => book.bookId == rowId);
    books[rowindex].bookTitle = document
      .getElementById("bookTitle")
      .value.toLowerCase();
    books[rowindex].author = document
      .getElementById("author")
      .value.toLowerCase();
    books[rowindex].totalPages = Number(
      document.getElementById("totalPages").value
    );
    books[rowindex].price = Number(document.getElementById("price").value);
  } else {
    //for new data
    let booksLength = books.reduce(
      (max, book) => Math.max(max, book.bookId),
      0
    );

    let generteid = books.length == 0 ? 1 : booksLength + 1;
    let booklist = {
      bookId: generteid,
      bookTitle: document.getElementById("bookTitle").value.toLowerCase(),
      author: document.getElementById("author").value.toLowerCase(),
      totalPages: Number(document.getElementById("totalPages").value),
      price: Number(document.getElementById("price").value),
    };
    books.push(booklist);
  }
  //$("#search-bar").css("display", "block");
  displayData();
  resetData();
}

function resetData() {
  document.getElementById("rowid").value = null; //to null the hidden field as it is not resetting on form reset
  document.getElementById("bookForm").reset();
  document.getElementById("submitBtn").innerHTML = "Submit";
}

function displayData() {
  let table = "";
  books.map(
    (book) =>
      (table += `
         <tr>
                    <td class="searchable">${book.bookId}</td>
                    <td class="searchable">${book.bookTitle}</td>
                    <td class="searchable">${book.author}</td>
                    <td class="searchable">${book.totalPages}</td>
                    <td class="searchable">${book.price}</td>
                    <td>
                        <button type = "button" onclick="editData(${book.bookId})">EDIT
                        </button>
                        <button type = "button" onclick="deleteData(${book.bookId})">DELETE
                        </button>
                    </td>
                </tr>
  `)
  );
  document.getElementById("table-data").innerHTML = table;

  if (table != "") {
    $("#search-bar").show();
  } else {
    $("#search-bar").hide();
  }
}

function editData(id) {
  books.forEach((book) => {
    if (book.bookId == id) {
      document.getElementById("rowid").value = book.bookId;
      document.getElementById("bookTitle").value = book.bookTitle;
      document.getElementById("author").value = book.author;
      document.getElementById("totalPages").value = book.totalPages;
      document.getElementById("price").value = book.price;
      document.getElementById("submitBtn").innerHTML = "Update";
    }
  });
}

function deleteData(book) {
  let bookID = books.findIndex((obj) => obj.bookId === book);
  books.splice(bookID, 1);
  displayData();
}

function searchData() {
  let search = $("#searchInput").val().toLowerCase();

  $("#table-data tr").each(function () {
    //for each table row
    let rowVisibility = false;
    $(this)
      .find(".searchable")
      .each(function () {
        if ($(this).text().toLowerCase().indexOf(search) > -1) {
          rowVisibility = true;
          return false;
        }
      });

    if (rowVisibility) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });
}

function sortData(key) {
  //remove th-sort-asc , th-sort-desc class from table header

  $("#bookTable th").removeClass("th-sort-asc th-sort-desc");

  //to set logic for ascending and descending

  if (currentSortKey == key) {
    currentSortType = currentSortType == "asc" ? "desc" : "asc";
  } else {
    currentSortKey = key;
    currentSortType = "asc";
  }

  // to sort data

  if (books.length > 0) {
    if (typeof books[0][key] == "number") {
      books.sort((bookA, bookB) => {
        return bookA[key] - bookB[key];
      });
    } else {
      books.sort((bookA, bookB) => {
        return bookA[key].localeCompare(bookB[key]);
      });
    }

    //to change css styles and
    if (currentSortType == "desc") {
      $(`#bookTable th[onclick="sortData('${key}')"]`).addClass("th-sort-desc");
      books.reverse();
    } else {
      $(`#bookTable th[onclick="sortData('${key}')"]`).addClass("th-sort-asc");
    }
  }

  // books.reverse();
  displayData();
}
