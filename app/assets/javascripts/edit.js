$(document).on('turbolinks:load', function(){
  $(function(){
    function buildHTML(count) {
      let html = `<div class="preview-box" id="preview-box__${count}">
                    <div class="upper-box">
                      <img src="" alt="preview">
                    </div>
                    <div class="lower-box">
                      <div class="delete-box" id="delete_btn_${count}">
                        <span>削除</span>
                      </div>
                    </div>
                  </div>`
      return html;
    }
    if (window.location.href.match(/\/items\/\d+\/edit/)){
      let prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
      $('.preview-box').each(function(index, box){
        $(box).attr('id', `preview-box__${index}`);
      })
      $('.delete-box').each(function(index, box){
        $(box).attr('id', `delete_btn_${index}`);
      })
      let count = $('.preview-box').length;
      if (count == 10) {
        $('.label-content').hide();
      }
    }
    function setLabel() {
      let prevContent = $('.label-content').prev();
      labelWidth = (620 - $(prevContent).css('width').replace(/[^0-9]/g, ''));
      $('.label-content').css('width', labelWidth);
    }
    $(document).on('change', '.hidden-field', function() {
      setLabel();
      let id = $(this).attr('id').replace(/[^0-9]/g, '');
      $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
      let file = this.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        let image = this.result;
        if ($(`#preview-box__${id}`).length == 0) {
          let count = $('.preview-box').length;
          let html = buildHTML(id);
          let prevContent = $('.label-content').prev();
          $(prevContent).append(html);
        }
        $(`#preview-box__${id} img`).attr('src', `${image}`);
        let count = $('.preview-box').length;
        if (count == 10) { 
          $('.label-content').hide();
        }
        if ($(`#item_images_attributes_${id}__destroy`)){
          $(`#item_images_attributes_${id}__destroy`).prop('checked',false);
        } 
        setLabel();
        if(count < 10){
          $('.label-box').attr({id: `label-box--${count}`,for: `item_images_attributes_${count}_image`});
        }
      }
    });
    $(document).on('click', '.delete-box', function() {
      let count = $('.preview-box').length;
      setLabel(count);
      let id = $(this).attr('id').replace(/[^0-9]/g, '');
      $(`#preview-box__${id}`).remove();
      if ($(`#item_images_attributes_${id}__destroy`).length == 0) {
        $(`#item_images_attributes_${id}_image`).val("");
        let count = $('.preview-box').length;
        if (count == 9) {
          $('.label-content').show();
        }
        setLabel(count);
        if(id < 10){
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
        }
      } else {
        $(`#item_images_attributes_${id}__destroy`).prop('checked',true);
        if (count == 10) {
          $('.label-content').show();
        }
        setLabel();
        if(id < 10){
          $('.label-box').attr({id: `label-box--${id}`,for: `item_images_attributes_${id}_image`});
        }
      }
    });
  });
});
