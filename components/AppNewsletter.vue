<template>
    <section class="v-app-newsletter child-remove-margin" >
        <p
            class="v-app-newsletter__title"
        >Laissez vos coordonnées pour recevoir nos informations</p
        >
        <form method="post"
              action="https://newsletter.infomaniak.com/external/submit"
              target="_blank"
        >
            <input type="email"
                   name="email"
                   style="display:none"
            />
            <input type="hidden"
                   name="key"
                   value="eyJpdiI6InNGaGhYV2owa1ltM3F4SXBZVCtucW9XSUlKc3lXcHJmQkljb0xTZHdcL1BjPSIsInZhbHVlIjoiQXVsaW9XUXZVMlFRa3dFUk1UMWVMYzFPRDhjeUN6eDVjRGkrWlM4RndZWT0iLCJtYWMiOiJiYWQ2OWYyYzVhYmI5MDQzN2FkNmUyYjZhNjAxNjc0M2ZjZDNlZDUyZTBiY2I0YmY0NTlkOWNiZmExOTdiNzg4In0="
            >
            <input type="hidden"
                   name="webform_id"
                   value="15587"
            >
            <input
                class="v-app-newsletter__input"
                name="inf[1]"
                data-inf-meta="1"
                type="email"
                placeholder="@"
                required="required"
                data-inf-error="Merci de renseigner une adresse email"
            />
            <input class="app-button app-button--small" type="submit" name="" value="Envoyer">
        </form>
    </section>
</template>





<script lang="ts" setup>
// defineProps<{
// }>()

</script>





<style lang="scss" scoped >
.v-app-newsletter {
    background: var(--app-color-main--dark);
    padding: 2.55555555556rem var(--base-padding-x);

    .v-app-newsletter__input {
        font-size: 1.5rem;
        line-height: 1.5rem;

        @media (max-width: 900px) {
            font-size: 1rem;
            line-height: 1rem;
        }
    }
}

.v-app-newsletter__title {
    color: var(--app-color-white);
    font-size: 2.66666666667rem;
    background: transparent !important;
    text-align: center;
    text-wrap: balance;
    padding: 0;
    font-weight: 600;
    margin-bottom: 1.77777777778rem;
    line-height: 1;
    max-width: none;
}

form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

input[type='email'] {
    all: unset;
    font-family: inherit;
    background: white;
    border-radius: 3rem;
    padding: 0.75rem 0.83333333333rem;
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 1.77777777778rem;
    font-size:1.77777777778rem;
    font-weight: 500;
    line-height: 1;
    max-width: 60ch;

    &::placeholder {
        color: var(--app-color-main--dark);
    }
}

input[type='submit'] {
    background-color: var(--app-color-yellow);
    color: var(--app-color-black);
    border: none;
    width: auto;

    &:hover {
        background-color: var(--app-color-yellow-light);
        color: var(--app-color-black);
    }
}

</style>
