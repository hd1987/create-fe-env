export let loading = () => {
  (function ($) {
    let loadingHTML = `<div class="loading"></div>`

    $(document).ajaxStart(function () {
      $('body').append(loadingHTML)
    })

    $(document).ajaxStop(function () {
      $('.loading').remove()
    })
  })(jQuery)
}
