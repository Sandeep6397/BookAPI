const books = [{
        ISBN: "12345ONE",
        title: "Start with MERN",
        authors: [1,2],
        language: "English",
        pub_Date: "2020-01-17",
        noOfPage: 100,
        category: ["Fiction", "web"],
        publication:  1,
    },
    {
        ISBN: "12345TWO",
        title: "Start with JAVA",
        authors: [1],
        language: "Hindi",
        pub_Date: "2020-01-17",
        noOfPage: 1000,
        category: ["Fiction", "Programming", "web"],
        publication:  1,
    },
    {
        ISBN: "12345THREE",
        title: "Start with PYTHON",
        authors: [1,2],
        language: "English",
        pub_Date: "2020-01-17",
        noOfPage: 100,
        category: ["Fiction", "Programming", "web"],
        publication:  1,
    },
];

const authors = [
    {
        id: 1,
        name: "Sandeep",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "Suraj",
        books: ["12345TWO"],
    }
];

const publications = [{
    id: 1,
    name : "chakra",
    books: ["12345ONE", "12345TWO"],

}];

module.exports = {books,authors,publications};