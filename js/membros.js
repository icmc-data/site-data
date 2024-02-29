// Function to load YAML file
function loadYAML(file, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                callback(null, xhr.responseText);
            } else {
                callback(xhr.statusText, null);
            }
        }
    };
    xhr.open("GET", file, true);
    xhr.send();
}

function photoHtml(path) {
    html = "<img " +
        "src='/public/people/" + path + "'" +
        "style='max-width: 200px; display: block; " +
        "  margin-left: auto; " +
        "  margin-right: auto;' " +
        "class='gradient-wrapper'" +
        "/>"
    return html;
}

function nameHtml(name) {
    html = "<p class='title center text-center'>" +
        name +
        "</p>"
    return html;
}

function descriptionHtml(description) {
    html = "<p class='subtitle center text-center'>" +
        description +
        "</p>"
    return html;
}

function roleHtml(role) {
    html = "<p class='subtitle center text-center'> <i>" +
        role +
        "</i></p>"
    return html;
}

function linkedinHtml(link) {
    html = "<div class='center'>" +
    "    <a href='" + link + "'>" +
    "        <button" +
    "            class='button linkedin'" +
    "            style='border-radius: 25px;'" +
    "        >" +
    "            <span class='icon is-small'>" +
    "                <i class='fab fa-linkedin-in'></i>" +
    "            </span>" +
    "        </button>" +
    "    </a>" +
    "</div>"
    return html;
}

// Function to render people from YAML
function renderPeople(data) {
    var peopleList = document.getElementById('people-list');
    var people = jsyaml.load(data);
    console.log("ola");
    var array = Object.values(people);
    console.log(array.length);
    for (let i = 0; i < array.length;) {
        let j = i
        var html = "";
        html += "<div class='section group'>"
        for (; j < (i+2); j++){
            var person = array[j];
            var li = document.createElement('li');
                     
            html += 
                "<div class='col span_1_of_2'>" +
                "    <div class='tile  ancestor-spacing' style='margin-top: 3%;'>" +
                "        <div class='tile is-parent'>" +
                "            <article class='tile is-child box-overwritten'>";
            html += nameHtml(person.name);
            html += roleHtml(person.role);
            html += photoHtml(person.img);
            html += descriptionHtml(person.description);
            html += linkedinHtml(person.linkedin);
            html += 
                "           </article>" +
                "       </div>" +
                "   </div>" +
                "</div>"

            }
        html += "</div>"
        li.innerHTML = html;
        peopleList.appendChild(li);
        i = j;
        console.log(j);

    };
    console.log(peopleList);
    //   console.log(peopleList);
}

// Load YAML file and render people
loadYAML('people.yaml', function (error, data) {
    if (error) {
        console.error('Error loading YAML file:', error);
    } else {
        renderPeople(data);
    }
    setPageHeight(data);
});


function setPageHeight(data) {
    var people = jsyaml.load(data);
    let n = Object.values(people).length;
    n = n/2;

    // document.getElementById("particles-js").style.height = String(1200*(n/2)) + "px";
  }