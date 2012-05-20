// longtable 1.2 - a minimalistic table pager for jQuery

// Copyright 2011, 2012 Chris Forno
// Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).

// Requirements:
//  * jQuery >= 1.4.3

(function ($) {
  var defaults = {'perPage': 10, 'startPage': 1};

  function showRows(table, offset, n) {
    table.find('tbody tr').hide().slice(offset, offset + n).show();
  }

  $.fn.longtable = function (options) {
    var settings = $.extend(defaults, options || {});
    var table = this;
    var nRows = table.find('tbody tr').length;
    var nPages = Math.max(1, Math.ceil(nRows / settings.perPage));
    var nCols = 0;
    // Determine the number of columns in the table.
    if (nRows) {
      $(table.find('tbody tr')[0].cells).each(function (_, c) {
        nCols += $(c).attr('colspan') ? parseInt($(c).attr('colspan'), 10) : 1;
      });
    }

    var pagingControls = $('<th class="paging-controls" colspan="' + nCols + '"></th>');
    var prev = $('<a class="page prev" href=""></a>');
    var next = $('<a class="page next" href=""></a>');
    var leftElide = $('<span class="elide"></span>');
    var rightElide = $('<span class="elide"></span>');
    var pages = [];
    for (var i = 1; i <= nPages; i++) {
      pages.push($('<a class="page direct" href="" page="' + i + '" style="display: none">' + i + '</a>'));
    }

    pagingControls.append(prev).append(pages[0]).append(leftElide);
    for (var i = 2; i < nPages; i++) {
      pagingControls.append(' ').append(pages[i - 1]).append(' ');
    }
    pagingControls.append(rightElide).append(pages[pages.length - 1]).append(next);
    // Put paging controls in the tfoot.
    var tfoot = table.find('tfoot');
    if (tfoot.length === 0) {
      tfoot = $('<tfoot></tfoot>').appendTo(table);
    }
    $('<tr></tr>').append(pagingControls).appendTo(tfoot);

    table.gotoPage = function (n) {
      n = Math.max(Math.min(n, nPages), 1);
      var start = Math.max(1, Math.min(n - 2, nPages - 4));
      var end = Math.min(start + 4, nPages);
      if (n === 1) {
        prev.css('visibility', 'hidden');
      } else {
        prev.css('visibility', '').attr('page', n - 1);
      }
      if (n === nPages) {
        next.css('visibility', 'hidden');
      } else {
        next.css('visibility', '').attr('page', n + 1);
      }
      start === 1 ? leftElide.hide() : leftElide.show();
      end === nPages ? rightElide.hide() : rightElide.show();
      if (nPages <= 1) return;
      pagingControls.find('a.page.direct').filter(':visible').hide();
      for (var i = start; i <= end; i++) {
        pages[i - 1].show();
      }
      if (start > 1) pages[0].show();
      if (end < nPages) pages[pages.length - 1].show();
      for (var i = 0; i < pages.length; i++) {
        (i + 1) === n ? pages[i].removeAttr('href') : pages[i].attr('href', '');
      }
      showRows(table, (n - 1) * settings.perPage, settings.perPage);
      table.trigger('longtable.pageChange', [n]);
    };

    pagingControls.delegate('a', 'click', function () {
      table.gotoPage(parseInt($(this).attr('page'), 10));
      return false;
    });

    table.gotoPage(settings.startPage);

    return this;
  };
})(jQuery);
