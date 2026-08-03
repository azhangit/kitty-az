import { Head, usePage } from '@inertiajs/react';

const DEFAULT_DESCRIPTION =
    "Rescuing, rehabilitating, and rehoming Dubai's street cats with compassion and care. Adopt, foster, or support Dubai Street Kitties.";

const DEFAULT_IMAGE = '/images/home-hero.png';

export default function SeoHead({
    title,
    description = DEFAULT_DESCRIPTION,
    image = DEFAULT_IMAGE,
    type = 'website',
}) {
    const { ziggy } = usePage().props;
    const pageUrl = ziggy?.location || 'https://www.dubaistreetkitties.com';
    const absoluteImage = image.startsWith('http')
        ? image
        : new URL(
              image,
              pageUrl.startsWith('http') ? pageUrl : 'https://www.dubaistreetkitties.com',
          ).toString();
    const socialTitle = title.includes('Dubai Street Kitties')
        ? title
        : `${title} - Dubai Street Kitties`;

    return (
        <Head title={title}>
            <meta head-key="description" name="description" content={description} />
            <meta head-key="og:type" property="og:type" content={type} />
            <meta head-key="og:title" property="og:title" content={socialTitle} />
            <meta
                head-key="og:description"
                property="og:description"
                content={description}
            />
            <meta head-key="og:url" property="og:url" content={pageUrl} />
            <meta head-key="og:image" property="og:image" content={absoluteImage} />
            <meta head-key="og:site_name" property="og:site_name" content="Dubai Street Kitties" />
            <meta head-key="twitter:card" name="twitter:card" content="summary_large_image" />
            <meta head-key="twitter:title" name="twitter:title" content={socialTitle} />
            <meta
                head-key="twitter:description"
                name="twitter:description"
                content={description}
            />
            <meta head-key="twitter:image" name="twitter:image" content={absoluteImage} />
        </Head>
    );
}
