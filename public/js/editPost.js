const updatePostFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const post_id = parseInt(document.querySelector('#title').getAttribute("data-post-id"));

    // console.log(content, post_id);

    if (content && title) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            // console.log(response);
            // console.log(content, post_id);
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        };
    };
};

const deletePostHandler = async () => {
    const post_id = parseInt(document.querySelector('#title').getAttribute("data-post-id"));

    if (post_id) {
        const response = await fetch(`/api/posts/${post_id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            alert(response.statusText);
        };
    };
};

document
    .querySelector('.post-form')
    .addEventListener('submit', updatePostFormHandler);

document
    .querySelector('.delete-post-btn')
    .addEventListener('click', deletePostHandler);