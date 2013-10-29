"use strict";

var obp = {
  config: {
    $container: $("container"),
    $issue_template: $('#issue-template'),
    list_fragment: '<li class="grid-sizer"></li>',
    scf_list_url: [
      "http://seeclickfix.com/api/issues.json",
      "?at=Oakland,+CA",
      "&zoom=10",
      "&start=168",
      "&end=0",
      "&page=1",
      "&num_results=20",
      "&search=illegal+dumping",
      "issues.created_at",
      "&callback=?"
    ],
    promises: [],
    // to indicate when the process of adding promises to the above array
    // is complete
    addingPromises: $.Deferred()
  },

  init: function() {
    obp.buildIssueList();
    obp.config.addingPromises
      .done(obp.layoutIssueList);
  },

  buildIssueList: function() {
    var issueTemplate = Handlebars.compile(obp.config.$issue_template.html());

    $.getJSON(obp.config.scf_list_url.join(""))
      .done(function (issues) {
        console.log(issues);
        issues.forEach(function(issue) {
          console.log("about to add a promise");
          obp.config.promises.push($.getJSON(scf_detail_url(issue.issue_id))
            .done(function(issue_detail) {
              console.log(issue_detail[0]);
              console.log(issue_detail[0].lat, issue_detail[0].lng);
              obp.config.list_fragment += (issueTemplate(createIssueTemplateObj(issue_detail[0])));
            }));
        });
        console.log("inside build...:" + obp.config.addingPromises.state());
        obp.config.addingPromises.resolve();
        console.log("inside build...: " + obp.config.addingPromises.state());
      });

    /* Helper functions * ===================================================================== */
    function scf_detail_url(id) {
      return "http://seeclickfix.com/api/issues/" + id + ".json?callback=?";
    }

    function stripUsa(address) {
      if (address.indexOf("USA") !== -1) {
        address = address.slice(0, -5);
      }
      return address;
    }

    function createIssueTemplateObj(issue_detail) {
      return {
        id: issue_detail.issue_id,
        photo_url: issue_detail.public_filename,
        address: stripUsa(issue_detail.address),
        desc: issue_detail.description,
        created_at: moment(issue_detail.created_at, "MM/DD/YYYY - hh:mma").fromNow()
      };
    }
  },
  
  layoutIssueList: function() {
    $.when.apply(null, obp.config.promises)
      .done(function() {
        console.log("about to append fragment");
        obp.config.$container.append($(obp.config.list_fragment));
        doLayout();
      });

    function doLayout() {
      obp.config.$container.imagesLoaded()
        .done(function() {
          console.log("about to start masonry layout");
          obp.config.$container.masonry({
            columnWidth: ".grid-sizer",
            itemSelector: ".item",
            gutter: 14
          });
        })
        .fail(function() {
          console.log("an image did not load?");
        });
    }
  }

};  // end of obp definition

$(document).ready(function() {
  // TODO: add error callbacks to the AJAX calls
  // add some type of loading spinner.
  obp.init();

});

