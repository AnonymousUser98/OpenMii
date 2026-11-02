// src/app/about/credits.js
// Credits text.
//
// Defines: CREDITS_MARKDOWN

var CREDITS_MARKDOWN = `# Mii Creator

(Contributors' names are shown in screen names)

## Austin / kat21 \uD83D\uDC7B

Lead Programmer, does the overwhelming majority of the app's development.
- All UI/UX Design for the app
- Does the majority of back-end server and frontend app work
- Designed Mii Creator account and login system
- Ported Arian's body scaling decompilation to JavaScript
- Has been the sole coder for most of the project

### Shaders

- Ported Switch shader using Arian's material tables
- Ported 3DS shader from Citra
- Custom Toon Shader
- Custom MatCap shaders

## Tyler

- PR Manager (Discord, YouTube, Marketing, planning updates, etc.)

# Major Contributors

## AboodXD ([aboood40091](https://github.com/aboood40091)) [FFL Decomp]
- [Decompiled FFL](https://github.com/aboood40091/ffl) (Without this, Mii Creator wouldn't exist)
- Shaders (Wii U in C++)
- Random Mii Generation
- Color Tables
- Mask Texture Code

## [tux7k](https://github.com/tuckotb)

- Greatly helped in development of the custom renderer and provided assistance when needed.

## Arian ([ariankordi](https://github.com/ariankordi))

Provided code and assisted with:

- Rendering ([mii-unsecure](https://github.com/ariankordi/ffl-testing) and [FFL.js](https://github.com/ariankordi/ffl.js), the first renderer systems Mii Creator ever used)
- [NNID/PNID API](https://github.com/ariankordi/nwf-mii-cemu-toy/blob/ffl-renderer-proto-integrate/README.md), and Random NNID feature
- Shaders, Materials, and Textures (Wii U, Miitomo, Switch) 
- Data Parsing (binary formats, QR Codes handling etc.)
- Resource Reader for Custom Renderer
- Body Scaling

Additionally:

- Provided general inspiration for the project, as Austin was very new to Miis before Arian stepped in to assist. Thank you!

# Mii Parsing

[AboodXD](https://github.com/aboood40091)
- [FFL resource (Mii Models/Textures)](https://github.com/aboood40091/ffl/blob/master/tools/FFLResource.py)

[Genwald](https://github.com/Genwald)
- [Switch CharInfo, FFSD formats](https://github.com/Genwald/MiiPort/blob/master/include/mii_ext.h)

Petari/RFL Decomp
- [Wii RFL CharData format](https://github.com/SMGCommunity/Petari/blob/master/libs/RVLFaceLib/include/RFLi_Types.h#L260)

Mii2Studio
- [Mii Studio format](https://github.com/HEYimHeroic/mii2studio/blob/master/gen3_studio.ksy)

# Music

- [objecty](https://x.com/objecty_twitt) (Original music for Classic and Space themes)     
- [Nolan26](https://www.youtube.com/@Nolan26official) (@Nolan26official) (Original music for Switch 2 theme)

[You can find the music here!](https://www.youtube.com/playlist?list=PLGpTUSDBaNFQtbm78RgbNQvU2mIG_5ttC)

# Spanish Translation

- David (dwyazzo90)   
- helloT (hellot.pnid)

# French Translation

- Supr ([supperfangamm3](https://x.com/suprthemii))

# Dutch Translation

- Armin / Armiichu ([armiichu](https://x.com/Armiichu/))

# Hat Design

- kat21 (Cap, Beanie, edit of Top Hat, Ribbon, Bow, edit of Pot Hat, King's Crown, Boo Crown, edit of Propeller Hat, Boo Hat, Imp Horns, Halo, extra caps ripped from Miitomo)
- max7866889 (Cowboy Hat, Bucket Hat, Viking Helmet, Eye Patch, Pikmin, Propeller Hat, Snow Hat, Chef Hat, and many more)
- Timimimi (Cat Ears, Straw Hat, Pot Hat)   
- tylerblu2103 (Hunting Cap)    
- rabbid_bwah (Rabbid Ears)   
- z7bf (Santa Hat)    

# External Hat Models

[Top Hat](https://models.spriters-resource.com/nintendo_switch/supersmashbrosultimate/asset/313099/)      
[Ribbon / Bow](https://models.spriters-resource.com/3ds/nintendogscats/asset/313024/)       
[Boo hat](https://models.spriters-resource.com/3ds/streetpassmiiplaza/asset/301716/)    
[Miitopia Horns](https://models.spriters-resource.com/3ds/miitopia/asset/350682/)     
[Doopliss Hat](https://cults3d.com/en/3d-model/art/doopliss)

# Outfit Design

- max7866889 (Created several outfits)
  - Made the majority of outfit designs and textures
- kat21 (Edited some outfits in post as well as created new ones)
  - Mainly made the following: Pajamas, Cleats, Royal, Aristocrat, Wizard, Winter, Traveler, Chef, Coat, Knitted Sweater, Space, Hoodie2, Vacation, Walking (extra variants), OverallsB, Vampire, Casual
- MilkGalaxy (Initial inspiration and help with outfit textures and designs; made the first few outfits ever made for Mii Creator.)
  - Contributions: Long-Sleeve, Short-Sleeve, Tank Top, Hoodie, Overalls, Leather Jacket, Button-up Coat, and more

# Icon Design

- rfguy1 (Reworked hair icons to be more accurate to their Switch 2 counterparts)
- kat21 (UI icons)
- tylerblu2103 (Additional hat icons)
- objecty (Face paint icon)

Many UI icons also come from [Lucide](https://lucide.dev/).

# Special Thanks

- raymonable (Helped with initial development for client-side rendering)    
- MilkGalaxy (Initial inspiration for outfit system, provided many helpful suggestions and improvements during development)

...And thank you for using Mii Creator! :) 

---
`;
