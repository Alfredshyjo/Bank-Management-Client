
toastr.options = {
    "closeButton": true,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "timeOut": "5000",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};


$.extend(true, $.fn.dataTable.defaults, {
    "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
    "pageLength": 10,
    "responsive": true,
    "autoWidth": false,
    "language": {
        "search": "Search:",
        "lengthMenu": "Show _MENU_ entries",
        "paginate": {
            "first": '<i class="fas fa-angle-double-left"></i>',
            "last": '<i class="fas fa-angle-double-right"></i>',
            "next": '<i class="fas fa-angle-right"></i>',
            "previous": '<i class="fas fa-angle-left"></i>'
        }
    }
});


function formatCurrency(amount) {
    if (!amount) return '₹0.00';
    return '₹' + parseFloat(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-IN', options);
}


function getTransactionTypeText(type) {
    const types = { 1: 'Deposit', 2: 'Withdrawal', 3: 'Transfer', 4: 'Interest', 5: 'Fee' };
    return types[type] || 'Unknown';
}

function getTransactionTypeBadge(type) {
    const badges = {
        1: '<span class="badge bg-success"><i class="fas fa-arrow-down"></i> Deposit</span>',
        2: '<span class="badge bg-danger"><i class="fas fa-arrow-up"></i> Withdrawal</span>',
        3: '<span class="badge bg-info"><i class="fas fa-exchange-alt"></i> Transfer</span>',
        4: '<span class="badge bg-success"><i class="fas fa-percent"></i> Interest</span>',
        5: '<span class="badge bg-warning"><i class="fas fa-file-invoice-dollar"></i> Fee</span>'
    };
    return badges[type] || '<span class="badge bg-secondary">Unknown</span>';
}


function getStatusText(status) {
    const statuses = { 1: 'Pending', 2: 'Approved', 3: 'Rejected' };
    return statuses[status] || 'Unknown';
}

function getStatusBadge(status) {
    const badges = {
        1: '<span class="badge bg-warning"><i class="fas fa-clock"></i> Pending</span>',
        2: '<span class="badge bg-success"><i class="fas fa-check-circle"></i> Approved</span>',
        3: '<span class="badge bg-danger"><i class="fas fa-times-circle"></i> Rejected</span>'
    };
    return badges[status] || '<span class="badge bg-secondary">Unknown</span>';
}


//function showLoading() {
//    if ($('#loadingOverlay').length === 0) {
//        const overlay = `
//            <div id="loadingOverlay" class="spinner-overlay">
//                <div class="spinner-border text-light" style="width: 3rem; height: 3rem;" role="status">
//                    <span class="visually-hidden">Loading...</span>
//                </div>
//            </div>
//        `;
//        $('body').append(overlay);
//    }
//}

function hideLoading() {
    $('#loadingOverlay').remove();
}


function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function () {
        toastr.success('Copied to clipboard!');
    }).catch(function () {
        toastr.error('Failed to copy');
    });
}


$(document).ready(function () {

    // Auto-hide alerts after 5 seconds
    setTimeout(function () {
        $('.alert').fadeOut('slow');
    }, 5000);

    // Confirm delete actions
    $('.btn-danger[data-confirm]').on('click', function (e) {
        if (!confirm($(this).data('confirm'))) {
            e.preventDefault();
        }
    });

    // Numeric input validation
    $('input[type="number"]').on('keypress', function (e) {
        if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57) && e.which !== 46) {
            return false;
        }
    });

    // PAN uppercase conversion
    $('input[name="PAN"]').on('input', function () {
        $(this).val($(this).val().toUpperCase());
    });

   


    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => new bootstrap.Tooltip(el));

    

});
