function fetchIssues () {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
        const id = issues[i].id;
        const desc = issues[i].description;
        const severity = issues[i].severity;
        const assignedTo = issues[i].assignedTo;
        const status = issues[i].status;
    
        issuesList.innerHTML += '<div class="well">'+
                                    '<h6>Issue ID: ' + id + '</h6>'+
                                    '<p><span class="label label-info">' + status + '</span></p>'+
                                    '<h3>' + desc + '</h3>'+
                                    '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+
                                    '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                    '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
                                    '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(event) {
    const issueId = chance.guid();
    const issueDesc = document.getElementById('issueDescInput').value;
    const issueSeverity = document.getElementById('issueSeverityInput').value;
    const issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    const issueStatus = 'Open';

    const issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') === null) {
        const issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }else{
        const issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    event.preventDefault();
}

function setStatusClosed(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues[i].status = "Closed";
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

function deleteIssue(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));

    for(let i = 0; i < issues.length; i++) {
        if(issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}