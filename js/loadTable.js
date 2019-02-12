function loadTable()
{
    // var allTextLines = allText.split(/\r\n|\n/);
    var allTextLines = $(document).ready(function() {
        $.ajax({
            type: "GET",
            url: "../Building_Footprints.csv",
            dataType: "text",
            success: function(data) {return data.split(/\r\n|\n/);}
         });
    })
    var headers = allTextLines[0].split(',');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {

            var tarr = [];
            for (var j=0; j<headers.length; j++) {
                tarr.push(headers[j]+":"+data[j]);
            }
            lines.push(tarr);
        }
    }

    $("table").append(lines)
};

