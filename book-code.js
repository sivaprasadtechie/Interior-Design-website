// Wait for the window to load
window.addEventListener('load', () => {
    const params = (new URL(document.location)).searchParams;
    const nprop = params.get('name');
    if (nprop !== null && nprop !== '') {
        document.getElementById('prop').value = nprop;
    }

    // Add event listener to the form
    const form = document.getElementById('frm'); // Assuming your form has the id "frm"
    form.addEventListener('submit', submitForm); // Use the submitForm function
});

async function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    const num_val = document.getElementById('num').value;
    const email_val = document.getElementById('email').value;
    const name_val = document.getElementById('nam').value;
    const prop_val = document.getElementById('prop').value;
    const whatsapp = document.getElementById('whatsapp').checked;

    // Validate Email
    if (email_val.includes('@') && email_val.includes('.')) {
        // Validate Phone Number
        if (num_val.length === 10 && !isNaN(num_val) && num_val[0] >= '7' && num_val[0] <= '9') {
            const data = {
                name: name_val,
                email: email_val,
                num: num_val,
                whatsapp: whatsapp,
                prop: prop_val
            };

            try {
                const response = await fetch('http://localhost:3000/', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                if (result.message) {
                    document.getElementById('subm').style.display = 'block';
                } else {
                    alert('Error: ' + result.error);
                }

            } catch (error) {
                console.error('Submission error:', error);
                alert('Successfull submission');
            }

        } 
    } 
}
