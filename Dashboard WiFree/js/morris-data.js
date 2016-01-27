$(function() {

    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            Mes: '2010 Q1',
            Facbook: 2666,
            Twitter: null,
            Instagram: 2647
        }, {
            Mes: '2010 Q2',
            Facbook: 2778,
            Twitter: 2294,
            Instagram: 2441
        }, {
            Mes: '2010 Q3',
            Facbook: 4912,
            Twitter: 1969,
            Instagram: 2501
        }, {
            Mes: '2010 Q4',
            Facbook: 3767,
            Twitter: 3597,
            Instagram: 5689
        }, {
            Mes: '2011 Q1',
            Facbook: 6810,
            Twitter: 1914,
            Instagram: 2293
        }, {
            Mes: '2011 Q2',
            Facbook: 5670,
            Twitter: 4293,
            Instagram: 1881
        }, {
            Mes: '2011 Q3',
            Facbook: 4820,
            Twitter: 3795,
            Instagram: 1588
        }, {
            Mes: '2011 Q4',
            Facbook: 15073,
            Twitter: 5967,
            Instagram: 5175
        }, {
            Mes: '2012 Q1',
            Facbook: 10687,
            Twitter: 4460,
            Instagram: 2028
        }, {
            Mes: '2012 Q2',
            Facbook: 8432,
            Twitter: 5713,
            Instagram: 1791
        }],
        xkey: 'Mes',
        ykeys: ['Facbook', 'Twitter', 'Instagram'],
        labels: ['Facbook', 'Twitter', 'Instagram'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Facebook",
            value: 26
        }, {
            label: "Instagram",
            value: 30
        }, {
            label: "Twitter",
            value: 20
        },
              {
            label: "Correo",
            value: 20
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: '2006',
            a: 100,
            b: 90
        }, {
            y: '2007',
            a: 75,
            b: 65
        }, {
            y: '2008',
            a: 50,
            b: 40
        }, {
            y: '2009',
            a: 75,
            b: 65
        }, {
            y: '2010',
            a: 50,
            b: 40
        }, {
            y: '2011',
            a: 75,
            b: 65
        }, {
            y: '2012',
            a: 100,
            b: 90
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Series A', 'Series B'],
        hideHover: 'auto',
        resize: true
    });

});
