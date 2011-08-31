// longtable 0.1 - a minimalistic table pager for jQuery

// Copyright 2011 Chris Forno
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Requirements:
//  * jQuery >= 1.4.3

// Only works for a single static table per page.

(function ($) {
  var settings = {};
  var defaults = {
    'perPage': 10
  };
  var table;
  var numPages = 0;
  var currentPage = 1;
  var pagerControls = null;

  function showRows(offset, n) {
    // Naive and inefficient.
    table.find('tbody tr').each(function (i, row) {
      if (i >= offset && i < offset + n) {
        $(row).show();
      } else {
        $(row).hide();
      }
    });
  }

  function pageLink(n, text) {
    return '<a class="page" href="#pg' + n + '">' + (text || n) + '</a>';
  }

  function goToPage(n) {
    currentPage = n;
    updateControls();
    showRows((currentPage - 1) * settings.perPage, settings.perPage);
  }

  function updateControls() {
    var prev = (currentPage === 1)        ? '' : pageLink(currentPage - 1, '◀ prev');
    var next = (currentPage === numPages) ? '' : pageLink(currentPage + 1, 'next ▶');
    var pages = '';
    var start = Math.max(1, Math.min(currentPage - 2, numPages - 4));
    var end = Math.min(start + 4, numPages);
    if (start > 1) {
      pages += pageLink(1) + ' <span class="page">…</span> ';
    }
    for (var i = start; i <= end; i++) {
       if (i === currentPage) {
         pages += '<span class="page">' + i + '</span> ';
       } else {
         pages += pageLink(i) + ' ';
       }
    }
    if (end < numPages) {
      pages += '<span class="page">…</span> ' + pageLink(numPages);
    }
    pagerControls.empty().append('<span style="float: left;">' + prev + '</span> <span class="pages">' + pages + '</span> <span style="float: right;">' + next + '</span>');
  }

  $.fn.longtable = function (options) {
    table = this;
    settings = $.extend(defaults, options || {});

    // Put paging controls in the tfoot.
    var tfoot = table.find('tfoot');
    if (tfoot.length === 0) {
      tfoot = $('<tfoot></tfoot>').appendTo(table);
    }
    var nColumns = table.find('tr')[0].cells.length;
    var nRows = table.find('tbody tr').length;
    numPages = Math.ceil(nRows / settings.perPage);
    pagerControls = $('<th class="pager-controls" style="text-align: center;" colspan="' + nColumns + '"></th>');
    $('<tr></tr>').append(pagerControls).appendTo(tfoot);
    pagerControls.delegate('a', 'click', function () {
      goToPage(parseInt(/\d+/.exec($(this).attr('href'))[0], 10));
    });
    var pgHash = /#pg(\d+)/.exec(window.location.hash);
    if (pgHash) {
      goToPage(parseInt(pgHash[1], 10));
    } else {
      goToPage(1);
    }
    updateControls();
    return this;
  };
})(jQuery);