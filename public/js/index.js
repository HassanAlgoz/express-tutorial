(function() {
    console.log('index.js loaded')

    let limit = 3;
    let page = 1;

    getPosts(0, limit)

    $('#moreButton').on('click', (evt) => {
        page++;
        let offset = (page - 1) * limit
        getPosts(offset, limit)
    })
})()

function getPosts(offset , limit) {
    $.ajax({
        method: "GET",
        url: `/api/posts?limit=${limit}&offset=${offset}`,

        success: (data) => {
            console.log(data)
            for(let i = 0; i < data.length; i++) {
                let post = data[i];
                $('#pagesList').append(`<li><a href="/posts/${post._id}">${post.title}</a></li>`)
            }
        },

        error: (err) => {
            console.log(err)
        }
    })
}