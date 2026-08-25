import math
from PIL import Image, ImageDraw, ImageFont

def create_app_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # 1. Background Rounded Rectangle / Full Canvas Gradient
    for y in range(size):
        for x in range(size):
            t = (x + y * 1.2) / (2.2 * size)
            r = int(255 * (1 - t) + 255 * t)
            g = int(75 * (1 - t) + 140 * t)
            b = int(120 * (1 - t) + 20 * t)
            img.putpixel((x, y), (r, g, b, 255))

    draw = ImageDraw.Draw(img)

    # 2. Main White Circle Plate with subtle shadow
    cx, cy = size // 2, size // 2
    r_shadow = int(size * 0.43)
    draw.ellipse([cx - r_shadow, cy - r_shadow + int(size * 0.02), cx + r_shadow, cy + r_shadow + int(size * 0.02)], fill=(200, 40, 70, 80))

    r_outer = int(size * 0.42)
    draw.ellipse([cx - r_outer, cy - r_outer, cx + r_outer, cy + r_outer], fill=(255, 255, 255, 255))

    # Inner soft pastel circle
    r_inner = int(size * 0.38)
    draw.ellipse([cx - r_inner, cy - r_inner, cx + r_inner, cy + r_inner], fill=(255, 248, 250, 255))

    # 3. Fonts
    font_path = '/System/Library/Fonts/ヒラギノ丸ゴ ProN W4.ttc'
    font_main = ImageFont.truetype(font_path, int(size * 0.38))
    font_sub = ImageFont.truetype(font_path, int(size * 0.11))

    # 4. Center Kanji "学" in vibrant magenta/pink
    kanji = "学"
    bbox = draw.textbbox((0, 0), kanji, font=font_main)
    w_k = bbox[2] - bbox[0]
    h_k = bbox[3] - bbox[1]
    kx = cx - w_k // 2
    ky = int(size * 0.22)
    draw.text((kx, ky), kanji, font=font_main, fill=(235, 40, 100, 255))

    # 5. Helper to draw stars
    def draw_star(center_x, center_y, outer_r, inner_r, color):
        points = []
        for i in range(10):
            r = outer_r if i % 2 == 0 else inner_r
            angle = i * math.pi / 5 - math.pi / 2
            px = center_x + int(r * math.cos(angle))
            py = center_y + int(r * math.sin(angle))
            points.append((px, py))
        draw.polygon(points, fill=color)

    # Cute Gold Stars on sides
    draw_star(int(cx - size * 0.28), int(cy - size * 0.22), int(size * 0.07), int(size * 0.03), (255, 190, 0, 255))
    draw_star(int(cx + size * 0.28), int(cy - size * 0.22), int(size * 0.07), int(size * 0.03), (255, 190, 0, 255))
    draw_star(int(cx - size * 0.27), int(cy + size * 0.18), int(size * 0.05), int(size * 0.02), (16, 185, 129, 255))
    draw_star(int(cx + size * 0.27), int(cy + size * 0.18), int(size * 0.05), int(size * 0.02), (2, 132, 199, 255))

    # 6. Bottom Ribbon Pill with "わくわく"
    pill_w = int(size * 0.72)
    pill_h = int(size * 0.18)
    pill_x0 = (size - pill_w) // 2
    pill_y0 = int(size * 0.69)
    draw.rounded_rectangle([pill_x0, pill_y0, pill_x0 + pill_w, pill_y0 + pill_h], radius=pill_h//2, fill=(255, 75, 114, 255))

    # White text "わくわく"
    sub_text = "わくわく"
    bbox_sub = draw.textbbox((0, 0), sub_text, font=font_sub)
    w_s = bbox_sub[2] - bbox_sub[0]
    h_s = bbox_sub[3] - bbox_sub[1]
    sx = cx - w_s // 2
    sy = pill_y0 + (pill_h - h_s) // 2 - int(size * 0.015)
    draw.text((sx, sy), sub_text, font=font_sub, fill=(255, 255, 255, 255))

    return img

icon_512 = create_app_icon(512)
icon_512.save("icon-512.png")

icon_192 = icon_512.resize((192, 192), Image.Resampling.LANCZOS)
icon_192.save("icon-192.png")

apple_icon = icon_512.resize((180, 180), Image.Resampling.LANCZOS)
apple_icon.save("apple-touch-icon.png")

favicon = icon_512.resize((64, 64), Image.Resampling.LANCZOS)
favicon.save("favicon.png")

print("New Cute Icons generated successfully!")
