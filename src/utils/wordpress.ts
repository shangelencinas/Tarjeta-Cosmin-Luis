export function generateElementorHtml(appUrl: string): string {
  return `<!-- ==========================================
  TARJETA DIGITAL COSMIN - WIDGET ELEMENTOR HTML
  Pega este bloque en un widget "HTML" de Elementor
=========================================== -->
<div class="cosmin-digital-card-wrapper" style="width: 100%; max-width: 1200px; margin: 0 auto; min-height: 850px; position: relative;">
  <iframe 
    src="${appUrl}" 
    title="Tarjeta Digital Luis Badilla - COSMIN & CosLink"
    style="width: 100%; min-height: 900px; border: none; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.08);"
    loading="lazy"
    allow="clipboard-write"
  ></iframe>
</div>`;
}

export function generateWordPressPluginPhp(appUrl: string): string {
  return `<?php
/**
 * Plugin Name: Tarjeta Digital COSMIN & CosLink - Luis Badilla
 * Description: Integra la tarjeta de presentación digital interactiva de Luis Badilla (Director Comercial de COSMIN & CosLink) con soporte para shortcode y Elementor.
 * Version: 1.0.0
 * Author: COSMIN Consultoría Minera
 * Author URI: https://www.cosmin.com.mx
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

function cosmin_tarjeta_digital_shortcode($atts) {
    $atts = shortcode_atts(array(
        'height' => '920px',
        'border_radius' => '16px',
        'url' => '${appUrl}'
    ), $atts, 'tarjeta_cosmin');

    ob_start();
    ?>
    <div class="cosmin-card-container" style="width:100%; max-width:1100px; margin:20px auto; overflow:hidden;">
        <iframe 
            src="<?php echo esc_url($atts['url']); ?>" 
            style="width:100%; height:<?php echo esc_attr($atts['height']); ?>; border:none; border-radius:<?php echo esc_attr($atts['border_radius']); ?>; box-shadow:0 12px 35px rgba(15,23,42,0.08);"
            allow="clipboard-write"
            loading="lazy">
        </iframe>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('tarjeta_cosmin', 'cosmin_tarjeta_digital_shortcode');
add_shortcode('tarjeta_cosmin_luis', 'cosmin_tarjeta_digital_shortcode');
`;
}
