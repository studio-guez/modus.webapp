<template>
    <app-project-list 
        api-endpoint="bibliotheque" 
        page-type="report"
        :filter-map="tagMap" 
        filter-description="Filtré par tag"
        empty-message="Il n'y a pas encore de rapport pour" 
        @pdf-download="handlePdfDownload"
    />
</template>

<script setup lang="ts">
import AppProjectList from "~/components/AppProjectList.vue";

const tagMap = {
    "podcast": "Podcast",
    "video": "Vidéo",
    "photographie": "Photographie",
    "presentation": "Présentation",
    "enquete": "Enquête",
    "rapport": "Rapport",
    "mobilite_pietonne": "Mobilité Piétonne",
    "velo": "Vélo",
    "micro_logistique": "Micro-logistique",
    "logistique_urbaine": "Logistique Urbaine",
    "amenagement_du_territoire": "Aménagement du Territoire",
    "formation": "Formation",
    "train": "Train",
    "recherche": "Recherche",
    "plan_de_mobilite": "Plan de Mobilité",
    "covoiturage": "Covoiturage",
    "evenement": "Événement",
    "experimentation": "Expérimentation",
    "transports_publics": "Transports Publics",
    "enfance": "Enfance",
    "sante": "Santé",
    "seniors": "Seniors",
}

function handlePdfDownload(pdfUrl: string) {
    window.open(pdfUrl, '_blank')
}
</script>
