<template>
    <div>
        <div class="c-footer__newsletter mt-2 text-right">
            <p>
               از پیشنهادات و تخفیفات شگفت انگیز خبردارم کنید
            </p>
            <input type="text" class="c-footer__input" placeholder="آدرس پست الکترونیکی شما">
            <button class="btn-ui primary block">
                عضویت در خبرنامه
            </button>
        </div>
        <hr>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
    .c-footer__newsletter {
        p {
            color: #7e7e7e;
            font-size: 12px;
            font-weight: bold;
        }
        button {
            margin-top: 5px;
            font-size: 12px;
        }
    }
    .c-footer__input {
      width: 100%;
      height: 35px;
      margin: 0 auto;
      border: solid 1px #7e7e7e !important;
      border-radius: $bradius;
      padding: 0 15px;
    }
</style>

