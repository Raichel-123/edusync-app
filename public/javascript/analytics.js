let course = location.pathname.slice(location.pathname.lastIndexOf('/')+1);

$.ajax({
    type: 'POST',
    url: "/analytics/view/"+course,
    success: (a,b)=>{
        let label = a.map((item)=>{return item.name});
        let value = a.map((item)=>{return item.count});
        var ctx = document.getElementById("views").getContext("2d");
        var options = { };
        var data = {
            labels: label,
            datasets: [
                {
                    label: "Views",
                     backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                    fillColor: "rgba(220,10,220,0.2)",
                    strokeColor: "rgba(220,20,220,1)",
                    pointColor: "rgba(220,30,220,1)",
                    pointStrokeColor: "#123",
                    pointHighlightFill: "#123",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: value
                }
            ]
        };
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
    }
});

$.ajax({
    type: 'POST',
    url: "/analytics/average/"+course,
    success: (a,b)=>{
        let label = a.map((item)=>{return item.name});
        let value = a.map((item)=>{return item.count});
        var ctx = document.getElementById("average").getContext("2d");
        var options = { };
        var data = {
            labels: label,
            datasets: [
                {
                    label: "Avg Retries",
                     backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                    fillColor: "rgba(220,10,220,0.2)",
                    strokeColor: "rgba(220,20,220,1)",
                    pointColor: "rgba(220,30,220,1)",
                    pointStrokeColor: "#123",
                    pointHighlightFill: "#123",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: value
                }
            ]
        };
        var myLineChart = new Chart(ctx, {
          type: 'line',
          data: data,
          options: options
        });
    }
});

$.ajax({
    type: 'POST',
    url: "/analytics/stack/"+course,
    success: (a,b)=>{
        let label = a.map((item)=>{return item.name});
        let value1 = a.map((item)=>{return item.success});
        let value2 = a.map((item)=>{return item.failure});
        var ctx = document.getElementById("stack").getContext("2d");
        var  options = {
            scales: {
              xAxes: [{
                stacked: true
              }],
              yAxes: [{
                stacked: true
              }]
            }
        }
        var data = {
            labels: label,
            datasets: [
                {
                    label: "Success",
                     backgroundColor: "#81c784",
                borderColor: "rgba(75,192,192,1)",
                    fillColor: "rgba(220,10,220,0.2)",
                    strokeColor: "rgba(220,20,220,1)",
                    pointColor: "rgba(220,30,220,1)",
                    pointStrokeColor: "#123",
                    pointHighlightFill: "#123",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: value1
                },
                {
                    label: "Failure",
                     backgroundColor: "#ef9a9a",
                borderColor: "rgba(75,192,192,1)",
                    fillColor: "rgba(220,10,220,0.2)",
                    strokeColor: "rgba(220,20,220,1)",
                    pointColor: "rgba(220,30,220,1)",
                    pointStrokeColor: "#123",
                    pointHighlightFill: "#123",
                    pointHighlightStroke: "rgba(220,220,220,1)",
                    data: value2
                }
            ]
        };
        var myLineChart = new Chart(ctx, {
          type: 'bar',
          data: data,
          options: options
        });
    }
});

$.ajax({
    type: 'POST',
    url: "/analytics/pie/"+course,
    success: (a,b)=>{
        var ctx = document.getElementById("pie")
        var options = { };
        var data = {
            labels: [
                "Successful Submissions",
                "Unsuccessful Submissions"
            ],
            datasets: [
                {
                    data: [a[0].success, a[0].failure] ,
                    backgroundColor: [
                        "#81c784",
                        "#ef9a9a",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#81c781",
                        "#ef9a91",
                        "#FFCE56"
                    ]
                }]
        };
        var myLineChart = new Chart(ctx, {
          type: 'pie',
          data: data,
          options: options
        });
    }
});





