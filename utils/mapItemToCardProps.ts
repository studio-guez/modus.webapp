import type { CardType } from '~/utils/cardConfig'
import { CARD_CONFIG, getCardConfig } from '~/utils/cardConfig'
import { formatDateRange } from '~/utils/formatDateRange'
import { findMediaInProject } from '~/utils/findMediaInProject'
import { buildPdfUrl } from '~/utils/backendUrl'
import type { IApiSingleProject } from '~/composable/adminApi/apiDefinitions'

export interface CardProps {
    cardType: CardType
    clickBehavior: 'navigate' | 'external' | 'play-video' | 'play-podcast'
    overlayIcon: 'play' | 'mic' | 'pdf' | null
    hasPdfButton: boolean
    hasStatus: boolean
    actionLabel: string
    imgSrc?: string
    objectPosition?: string
    dateLabel?: string
    title?: string
    subtitle?: string
    preview?: string
    status?: string
    statusColor?: string
    href?: string
    mediaUrl?: string
    pdfUrl?: string
}

interface ItemContent {
    title?: string
    headertitle?: string
    preview?: string
    datestart?: string
    dateend?: string
    isprojectwithduration?: 'true' | 'false'
    projecttype?: string
    isexternallink?: string
    externalurl?: string
    body?: unknown
    pdffile?: string
}

interface ItemData {
    slug: string
    content: ItemContent
    headerImage?: Array<{
        resize?: { reg?: string }
        focus?: string
    }>
}

/**
 * Determines the CardType based on item data and page context
 */
export function resolveCardType(item: ItemData, pageType?: 'media' | 'report' | 'tool' | 'project'): CardType {
    const content = item.content
    
    // Media page: check for video or podcast in body content
    if (pageType === 'media') {
        const media = findMediaInProject(content.body as unknown)
        if (media?.type === 'video') return 'video'
        if (media?.type === 'spotify') return 'podcast'
    }
    
    // Report page
    if (pageType === 'report') {
        return 'report'
    }
    
    // Tool page: check for external link
    if (pageType === 'tool') {
        const isExternal = content.isexternallink === 'true' || 
                          (content.externalurl && content.externalurl.startsWith('http'))
        return isExternal ? 'tool-external' : 'tool-internal'
    }
    
    // Project page: check for modus type
    if (content.projecttype === 'modus') {
        return 'project-modus'
    }
    
    return 'project-supported'
}

/**
 * Computes the project status based on dates
 */
function computeStatus(content: ItemContent): { status: string; statusColor: string } {
    const isOngoing = content.dateend && new Date(content.dateend) > new Date()
    return {
        status: isOngoing ? 'En cours' : 'Terminé',
        statusColor: isOngoing ? 'var(--app-color-orange)' : 'var(--app-color-black)'
    }
}

/**
 * Builds the href URL for the card
 */
function buildHref(item: ItemData, cardType: CardType): string | undefined {
    // External types use the external URL
    if (cardType === 'tool-external') {
        return item.content.externalurl
    }
    
    // Reports go to /rapport/
    if (cardType === 'report') {
        return `/rapport/${item.slug}`
    }
    
    // Everything else goes to /project/
    return `/project/${item.slug}`
}

/**
 * Extracts media URL from project body for video/podcast
 */
function extractMediaUrl(content: ItemContent): string | undefined {
    const media = findMediaInProject(content.body as unknown)
    return media?.content?.url
}

/**
 * Maps an API item to card props using the config system
 */
export function mapItemToCardProps(
    item: ItemData,
    pageType?: 'media' | 'report' | 'tool' | 'project'
): CardProps {
    const cardType = resolveCardType(item, pageType)
    const config = getCardConfig(cardType)
    const content = item.content
    const { status, statusColor } = config.hasStatus ? computeStatus(content) : { status: undefined, statusColor: undefined }
    
    return {
        cardType,
        clickBehavior: config.clickBehavior,
        overlayIcon: config.overlayIcon,
        hasPdfButton: config.hasPdfButton ?? false,
        hasStatus: config.hasStatus ?? false,
        actionLabel: config.actionLabel,
        imgSrc: item.headerImage?.[0]?.resize?.reg,
        objectPosition: item.headerImage?.[0]?.focus,
        dateLabel: config.hasDateLabel && content.datestart && content.dateend && (content.datestart !== content.dateend) ? formatDateRange(content.datestart, content.dateend) : undefined,
        title: content.title,
        subtitle: content.headertitle,
        preview: content.preview,
        status,
        statusColor,
        href: buildHref(item, cardType),
        mediaUrl: (cardType === 'video' || cardType === 'podcast') ? extractMediaUrl(content) : undefined,
        pdfUrl: (cardType === 'report') ? buildPdfUrl(item.slug) : undefined,
    }
}
