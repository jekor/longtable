# longtable 2.0 - A Minimalist JavaScript Table Pager

Demo at http://www.minjs.com/#longtable

## Features

* paging
* minimal code
* all controls rendered inside the table itself (currently the `<tfoot>`)
* no library dependencies

## How to Use

```JavaScript
var yourTable = document.getElementById('yourTable');
longtable(yourTable);
```

## Options

`longtable()` takes an options argument as an optional second argument. The options are:

* `perPage`: how many rows to display per page (default: 10)
* `startPage`: which page to display initially (default: 1)
* `maxPageLinks`: how many page navigation links to display (default: 9)

Longtable will display fewer than `maxPageLinks` page navigation links if there are fewer pages. For best results, use an odd numbered `maxPageLinks` greater than equal to 3.

```JavaScript
longtable(yourTable, {perPage: 20, maxPageLinks: 7});
```

## Functions

* `gotoPage(n)` - jump to the given page number

```JavaScript
yourTable.gotoPage(3);
```

## Events

* `longtable.pageChange` - triggered when the page changes (passes the page number)

## Notes

* Rows to be paged must be in the `<tbody>`.
* Does not support adding/removing table rows.

## Unsupported Browsers

* Internet Explorer <= 8
