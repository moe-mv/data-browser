(async () => {
    fetch("https://script.google.com/macros/s/AKfycbyApLpJPNU4kfc4nsYUu68oduqOiB8Min4795zU_GEIoyYIX5OwHP8vCth0s16ayjQw/exec")
      .then(res => res.json())
      .then(data => {
        $(function() {
          $("#dataset_select").selectize({
            plugins: ["restore_on_backspace", "clear_button"],
            maxItems: 1,
            valueField: "name",
            labelField: "title",
            searchField: "name",
            options: data
          });
        });
  
      })
  
    $("#dataset_select").bind("change", function(event) {
      console.log("Dataset changed")
      $("#output").empty().text("Loading...")
      var val = $(this).val();
      var renderers = $.extend(
        $.pivotUtilities.renderers,
        $.pivotUtilities.plotly_renderers
      );
      console.log("Fetching dataset...")
      Papa.parse("https://moe-mv.github.io/data-browser/datasets/" + val, {
        download: true,
        skipEmptyLines: true,
        complete: function(parsed) {
          $("#output").pivotUI(parsed.data, {
            hiddenAttributes: [""],
            renderers: renderers
          }, true);
        }
      });
    });
  
  })()
  