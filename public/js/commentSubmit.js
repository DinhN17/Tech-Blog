const submitCommentFormHandler = async (event) => {
    event.preventDefault();
    
    const post_id = parseInt(document.querySelector('#comment-input').getAttribute("data-post-id"));
    const content = document.querySelector('#comment-input').value.trim();

    // console.log(content, post_id);

    if (content) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ content, post_id }),
            headers: { 'Content-Type': 'application/json'},
        });

        if (response.ok) {
            // console.log(response);
            // console.log(content, post_id);
            document.location.replace(`/post/${post_id}`);
        } else {
            alert(response.statusText);
        };
    };
};

document
    .querySelector('.comment-form')
    .addEventListener('submit', submitCommentFormHandler);