const submitPostFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // console.log(content, post_id);

    if (content && title) {
        const response = await fetch('/api/posts', {
            method: 'POST',
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

document
    .querySelector('.post-form')
    .addEventListener('submit', submitPostFormHandler);