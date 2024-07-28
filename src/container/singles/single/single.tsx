import React, { FC } from "react";
import NcImage from "@/components/NcImage/NcImage";
import { getPostDataFromPostFragment } from "@/utils/getPostDataFromPostFragment";
import SingleHeader from "../SingleHeader";
import { FragmentType } from "@/__generated__";
import { NC_POST_FULL_FRAGMENT } from "@/fragments";

export interface SingleType1Props {
  post: FragmentType<typeof NC_POST_FULL_FRAGMENT>;
  showRightSidebar?: boolean;
}

const SingleType1: FC<SingleType1Props> = ({ post, showRightSidebar }) => {
  //
  const {
    title,
    content,
    date,
    author,
    databaseId,
    excerpt,
    featuredImage,
    ncPostMetaData,
  } = getPostDataFromPostFragment(post || {});
  //
  const hasFeaturedImage = !!featuredImage?.sourceUrl;

  const imgWidth = featuredImage?.mediaDetails?.width || 1000;
  const imgHeight = featuredImage?.mediaDetails?.height || 750;
  return (
    <>
      <script type="application/ld+json">[ {
    "@context": "http://schema.org", "@type": "WebSite", "name": "Attack of the Fanboy", "url": "https://attackofthefanboy.com", "sameAs": ["https://twitter.com/FanboyAttack", "https://www.facebook.com/AttackoftheFanboy", "https://www.twitch.tv/aotf", "https://www.youtube.com/FanboyAttack"]
}

,
{
    "@context":"http://schema.org",
    "publisher": {
        "@type":"Organization",
        "name":"LootAttack",   
		"url":"https:\/\/lootattack.com",
        "logo": {
            "@type": "ImageObject", "url": "https://members.lootattack.com/wp-content/uploads/2024/06/loot-attack-logo-smaller.png", "width": 336, "height": 61
        }
    }
    ,
    "datePublished":"<?php echo get_the_date('c'); ?>",
    "dateModified":"<?php the_modified_time('c'); ?>",
    "author": {
        "@type": "Person", "name": "<?php the_author(); ?>"
    }
    ,
    
    "mainEntityOfPage": {
        "@type": "WebPage", "@id": "<?php the_permalink(); ?>"
    }
    ,
    "url":"<?php the_permalink(); ?>",
    "description":"<?php echo(get_the_excerpt()); ?>",
    "@type":"Article",
    "headline":"<?php the_title(); ?>",
	"about": [<?php
    $posttags = get_the_tags();
    if ($posttags)
    {
        $first=true;
        foreach($posttags as $tag) 
        {
            if($first)
            {
                echo '"' .$tag->name. ' "'; 
                $first=false;
            }
            else
            {
                echo '," '.$tag->name. '"';
            }
        }
    }
?>],
    "articleSection":"<?php get_cat_name( $cat_id ) ?>
",
	
    "image": {
        "@type": "ImageObject", "contentUrl": "<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>", "url": "<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>", "width": <?php $image_data = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "full" ); ?>
	<?php $image_width = $image_data[1]; ?>
 <?php echo $image_width; ?>, "height": <?php $image_data = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), "full" ); ?>
	<?php $image_height = $image_data[2]; ?>
 <?php echo $image_height; ?>
    }
    ,
    "thumbnailUrl":"<?php echo wp_get_attachment_url(get_post_thumbnail_id()); ?>"
    
}

]</script>	
      <div className={`nc-PageSingle pt-8 lg:pt-16`}>
        <header className="container rounded-xl">
          <div
            className={
              !hasFeaturedImage && showRightSidebar
                ? ""
                : `max-w-screen-md mx-auto`
            }
          >
            <SingleHeader post={{ ...post }} />
            {!hasFeaturedImage && (
              <div className="my-5 border-b border-neutral-200 dark:border-neutral-800" />
            )}
          </div>
        </header>

        {/* FEATURED IMAGE */}
        {!!hasFeaturedImage && (
          <NcImage
            alt={title}
            containerClassName="container my-10 sm:my-12"
            className={`rounded-xl mx-auto ${
              imgWidth <= 768 && ncPostMetaData?.showRightSidebar
                ? "w-full max-w-screen-md"
                : ""
            }`}
            src={featuredImage?.sourceUrl || ""}
            width={imgWidth}
            height={imgHeight}
            sizes={"(max-width: 1024px) 100vw, 1280px"}
            priority
            enableDefaultPlaceholder
          />
        )}
      </div>
    </>
  );
};

export default SingleType1;
