
async function fetchXML() {
    try {
        const response = await fetch('http://localhost:3131/xml');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const xmlText = await response.text();
        return new window.DOMParser().parseFromString(xmlText, 'application/xml');
    } catch (error) {
        console.error('Error fetching XML:', error);
        return null;
    }
}




async function searchXML() {
    const searchTag = document.getElementById('searchTag').value.trim();
    if (!searchTag) {
        alert('Please enter a tag name');
        return;
    }

    const xmlDoc = await fetchXML();
    if (!xmlDoc) {
        document.getElementById('result').innerHTML = 'Error loading XML';
        return;
    }

    const elements = xmlDoc.getElementsByTagName(searchTag);
    if (elements.length === 0) {
        document.getElementById('result').innerHTML = 'No matching tags found';
        return;
    }

    let output = '';
    for (let i = 0; i < elements.length; i++) {
        // Serialize the element back to a string
        const serializer = new XMLSerializer();
        const elementString = serializer.serializeToString(elements[i]);
        output += `<pre>${escapeHtml(elementString)}</pre>`;
    }

    document.getElementById('result').innerHTML = output;
}

// Helper function to escape HTML characters
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
    };
    return text.replace(/[&<>]/g, function (char) {
        return map[char];
    });
}