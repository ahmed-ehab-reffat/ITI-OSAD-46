// Dismissible alerts
document.querySelectorAll('.dismiss-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    btn.closest('.alert').remove();
  });
});
