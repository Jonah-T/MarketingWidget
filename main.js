(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
			<style>
                div.gauge{
                    display:block;
                    width: 100%;
                    height: 30%;
                }
                h1.title {
                    display:block;
                    font-size: 32px;
                    color: #000000;       
                }
				:host {
					display: block;
				} 
			</style> 
            <h1 id="title_1" class="title"></h1>
			<div id="chart_gauge_1" class="gauge"></div>
            <h1 id="title_2" class="title"></h1>
            <div id="chart_gauge_2" class="gauge"></div>
    `;




    customElements.define('com-sap-sample-marketinggauge', class TestingLib extends HTMLElement {

        constructor() {

            super();
            this._shadowRoot = this.attachShadow({ mode: "open" });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            this._firstConnection = true;
            this._tagContainer;
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
                    /*
                    if (LabelData[0] !== null) {
                        if ( this._tagContainer) {
                            this._tagContainer.parentNode.removeChild(this._tagContainer);
                        }

                        this._tagContainer = document.createElement('h1');
                        var theText = LabelData[0];
                        this._tagContainer.appendChild(theText);
                        this._shadowRoot.appendChild(tagContainer);

                    }*/
                    google.charts.setOnLoadCallback(drawChart(this._shadowRoot, this._numberData, this._LabelData));
                }

            }
            function drawChart(shadow, NumberData, LabelData) {


                var options = {

                    redFrom: 0, redTo: 10,
                    greenFrom: 60, greenTo: 100,
                    minorTicks: 5
                };

                let tmpArr = [['Label', 'Value']];
                let tmpArr2 = [['Label', 'Value']];
                //for (var i = 0; i < NumberData.length; i++) {
                tmpArr.push(['', NumberData[0]]);
                tmpArr2.push(['', NumberData[1]]);
                //}
                var data = google.visualization.arrayToDataTable(tmpArr);
                var data2 = google.visualization.arrayToDataTable(tmpArr2);



                var chart_g = new google.visualization.Gauge(shadow.getElementById('chart_gauge_1'));
                var chart_gauge_2 = new google.visualization.Gauge(shadow.getElementById('chart_gauge_2'));
                var title_1 = shadow.getElementById('title_1');
                title_1.innerHTML = LabelData[0];
                var title_2 = shadow.getElementById('title_2');
                title_2.innerHTML = LabelData[1];

                chart_g.draw(data, options);
                chart_gauge_2.draw(data2, options);

                /*setInterval(function () {
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
                }, 26000);*/
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