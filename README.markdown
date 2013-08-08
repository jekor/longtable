longtable - a minimalistic javascript `<table>` pager - v1.2

Demo at http://www.minjs.com/#longtable

# Features

 - paging
 - minimal code
 - all controls rendered inside the table itself (currently the tfoot)

# How to Use

```
$('#your-table').longtable();
```

# Functions

 `gotoPage(n)` - jump to the given page number

# Events

 `longtable.pageChange` - triggered when the page changes (passes the page number)

# Notes

 - Rows to be paged must be in the `<tbody>`.
 - Does not support adding/removing table rows.

# Requirements:

jQuery >= 1.4.3

# License

Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
