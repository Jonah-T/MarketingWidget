(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
			<style>
				:host {
					display: block;
				} 
			</style> 
			<div id="chart_gauge"></div>
    `;




    customElements.define('com-sap-sample-marketinggauge', class TestingLib extends HTMLElement {

        constructor() {

            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = true;
            this._numberData;
            this._LabelData;

        }





        //Fired when the widget is added to the html DOM of the page
        connectedCallback() {

            let GoogleSRC = "https://www.gstatic.com/charts/loader.js";
            $.ajax({
                url: GoogleSRC,
                dataType: "script",
                async: true
            }
            ).done(() => {

                this._firstConnection = false;
                google.charts.load('current', { 'packages': [ 'gauge'] }).then(() => {
                    //google.charts.setOnLoadCallback(()=>{alert(google.visualization);});
                    google.charts.setOnLoadCallback(this.redraw());
                });


            }
            );



        }




        //Fired when the widget is removed from the html DOM of the page (e.g. by hide)
        disconnectedCallback() {

        }




        //When the custom widget is updated, the Custom Widget SDK framework executes this function first
        onCustomWidgetBeforeUpdate(oChangedProperties) {




        }




        //When the custom widget is updated, the Custom Widget SDK framework executes this function after the update
        onCustomWidgetAfterUpdate(oChangedProperties) {
            if (!this._firstConnection) {
                this.redraw();
            }
            //}
        }

        //When the custom widget is removed from the canvas or the analytic application is closed
        onCustomWidgetDestroy() {
        }





        //When the custom widget is resized on the canvas, the Custom Widget SDK framework executes the following JavaScript function call on the custom widget
        // Commented out by default

        onCustomWidgetResize(width, height) {
            this.redraw();
        }





        redraw() {

            if (!this._firstConnection) {
                if (this._numberData !== undefined) {
                    google.charts.setOnLoadCallback(drawChart(this._shadowRoot, this._numberData, this._LabelData));
                }

            }
            function drawChart(shadow, NumberData, LabelData) {

                var data = google.visualization.arrayToDataTable([
                    ['Label', 'Value'],
                    ['Memory', 80],
                    ['CPU', 55],
                    ['Network', 68]
                ]);

                var options = {
                    width: 400, height: 120,
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };

                var chart_g = new google.visualization.Gauge(shadow.getElementById('chart_gauge'));

                chart_g.draw(data, options);

                setInterval(function () {
                    data.setValue(0, 1, 40 + Math.round(60 * Math.random()));
                    chart_g.draw(data, options);
                }, 13000);
                setInterval(function () {
                    data.setValue(1, 1, 40 + Math.round(60 * Math.random()));
                    chart_g.draw(data, options);
                }, 5000);
                setInterval(function () {
                    data.setValue(2, 1, 60 + Math.round(20 * Math.random()));
                    chart_g.draw(data, options);
                }, 26000);
                /////////////
            }
        }


        get widgetData() {
            return this._numberData;
        }

        set widgetData(value) {
            this._numberData = value;
        }

        get widgetLabel() {
            return this._LabelData;
        }

        set widgetLabel(value) {
            this._LabelData = value;
        }

    });

})();