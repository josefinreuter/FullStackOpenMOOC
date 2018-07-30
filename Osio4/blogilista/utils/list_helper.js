const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const blogLikes = []

    for (let i = 0; i < blogs.length; i++) {
        blogLikes.push(blogs[i].likes)

    }

    const reducer = (sum, likes) => {
        return sum + likes
    }

    return blogs.length === 0 ? 0 : blogLikes.reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
    let mostLikes;

    if (blogs.length !== 0) {

        mostLikes = {
            "title": blogs[0].title,
            "author": blogs[0].author,
            "likes": blogs[0].likes
        }

        for (let i = 1; i < blogs.length; i++) {

            if (blogs[i].likes > mostLikes.likes) {
                mostLikes = {
                    "title": blogs[i].title,
                    "author": blogs[i].author,
                    "likes": blogs[i].likes
                }

            }

        }

    }

    return blogs.length === 0 ? "No blogs!" : mostLikes
}


const mostBlogs = (blogs) => {
    let mostBlogs;

    if (blogs.length !== 0) {
        let authors = [];

        for (let i = 0; i < blogs.length; i++) {
            authors.push(blogs[i].author)
        }

        let mostOccurrences = 0;
        let occurrences = 0;
        let author;
        for (let i = 0; i < authors.length; i++) {

            for (let j = i; j < authors.length; j++) {

                if (authors[i] === authors[j]) occurrences++;

                if (mostOccurrences < occurrences) {
                    mostOccurrences = occurrences;
                    author = authors[i];
                }

            }

            occurrences = 0;
        }

        mostBlogs = {
            "author": author,
            "blogs": mostOccurrences
        }

    }

    return blogs.length === 0 ? "No blogs!" : mostBlogs
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
}