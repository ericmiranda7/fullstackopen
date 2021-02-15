const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)

    return blogs[0]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
}