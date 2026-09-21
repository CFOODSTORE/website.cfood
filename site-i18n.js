(() => {
  'use strict';

  const EXTRA = {
    en:{
      nav:['Home','Company','Origin','RSE','Resources','Shop','Quality','Credentials','Contact / Quote'],
      page:['Home','Company','Origin','RSE','Resources','Shop','Quality','Credentials','Contact / Quote'],
      storyKicker:'Sambava · Madagascar Bourbon Vanilla',
      storyTitle:'From Sambava farms to international buyers',
      story:[
        ['Sambava, the birthplace of our vanilla','In northeastern Madagascar, Sambava is one of the historic centres of Bourbon vanilla production. Challenge Food works from this origin to connect Malagasy vanilla resources with international professional buyers.'],
        ['A tradition maintained by Malagasy growers','Vanilla flowers are pollinated manually by farmers, following traditional knowledge transmitted through generations. This careful work determines the future quality of every vanilla pod.'],
        ['Slow curing to develop the Bourbon aroma','After harvest, green vanilla pods undergo a patient curing process: preparation, controlled drying, sweating and maturation. These steps create the characteristic colour, texture and aroma of Madagascar Bourbon Vanilla.'],
        ['Prepared for international export','Challenge Food prepares export offers according to buyer requirements: grade, length, moisture, quantity, packing and destination documentation.']
      ],
      storyCta:'Discover the full shop',
      shopKicker:'Challenge Food Shop',shopTitle:'Our complete vanilla range',
      shopIntro:'Add several products to one cart, then submit a single request. Prices are confirmed according to the lot, packing and destination.',
      music:'♫ Shop music',industrialShortcut:'Bulk purchases +25 kg',cart:'Cart',
      products:{
        'grade-a':['Grade A · Gourmet','Premium Bourbon Vanilla Beans','Whole beans selected for gastronomy, pastry and premium distribution.','Grade A / Gourmet Bourbon Vanilla Beans'],
        'grade-b':['Grade B · Extraction','Vanilla for extraction','Lots for extractors, flavour manufacturers and industrial applications.','Grade B / Extraction Vanilla Beans'],
        'extract-1l':['Extract · 1L','Madagascar Vanilla Extract','Professional one-litre format for food applications and processing.','Madagascar Vanilla Extract 1L'],
        powder:['Powder','Vanilla powder','Ground vanilla for formulation, pastry and professional applications.','Madagascar Vanilla Powder'],
        seeds:['Seeds','Vanilla seeds','For preparations, inclusions and processing applications.','Vanilla Seeds'],
        'organic-nop':['Lot certification','Organic / NOP','Certified lots offered subject to availability and documentary verification.','Organic / NOP Vanilla'],
        fairtrade:['Lot certification','Fairtrade','Fairtrade-certified vanilla when an eligible lot is available.','Fairtrade Vanilla'],
        oleoresin:['Concentrate','Oleoresin / Concentrates','Technical enquiries according to fold, carrier, solvent and analytical specifications.','Vanilla Oleoresin / Concentrate'],
        custom:['Custom','Custom lot & packing','Length, moisture, vacuum packing, industrial packing or recurring supply programme.','Custom Lot & Packing']
      },
      price:'Price on request',add:'Add to cart',added:'Added ✓',
      industrialKicker:'BULK PURCHASES',industrialTitle:'Industrial purchase — from 25 kg',
      industrialText:'For importers, distributors, manufacturers, extractors and professional buyers. Specify the product, volume and destination to receive a volume-based offer.',
      industrialPoints:['Industrial minimum: <strong>25 kg</strong>','Export packing','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['Product *','Quantity in kg *','Company / Buyer *','Business email *','Country / Destination port *','Incoterm','Specifications / Message'],
      industrialPlaceholder:'Length, moisture, certification, packing, purchase frequency…',
      industrialSubmit:'Request an industrial quote +25 kg',
      cartTitle:'Your cart',cartEmpty:'Your cart is empty.',
      cartNote:'Prices, shipping and payment are confirmed after destination validation.',
      continuePay:'Continue to payment',qtyIn:'Quantity in',remove:'Remove',
      checkoutKicker:'Secure order',checkoutTitle:'Complete the order',
      checkoutNote:'Your cart is sent to Challenge Food. The final amount and secure payment link are sent after transport and specifications are confirmed.',
      checkoutLabels:['Company / Name *','Email *','Country *','Phone / WhatsApp','Address / destination *','Message'],
      checkoutPlaceholder:'Packing, Incoterm, requested lead time…',
      checkoutSubmit:'Confirm order and request payment link',
      sound:'Sound'
    },
    fr:{
      nav:['Accueil','Société','Origine','RSE','Ressources','Boutique','Qualité','Références','Contact / Devis'],
      page:['Accueil','Société','Origine','RSE','Ressources','Boutique','Qualité','Références','Contact / Devis'],
      storyKicker:'Sambava · Vanille Bourbon de Madagascar',
      storyTitle:'Des producteurs de Sambava aux acheteurs internationaux',
      story:[
        ['Sambava, berceau de notre vanille','Au nord-est de Madagascar, Sambava est l’un des centres historiques de production de vanille Bourbon. Challenge Food travaille depuis cette origine pour relier les ressources malgaches aux acheteurs professionnels internationaux.'],
        ['Une tradition maintenue par les producteurs malgaches','Les fleurs de vanille sont pollinisées manuellement par les producteurs selon un savoir-faire transmis de génération en génération. Ce travail minutieux détermine la qualité future de chaque gousse.'],
        ['Une préparation lente pour développer l’arôme Bourbon','Après récolte, les gousses vertes suivent une préparation patiente : échaudage, étuvage, séchage contrôlé et affinage. Ces étapes développent la couleur, la texture et l’arôme caractéristiques de la vanille Bourbon de Madagascar.'],
        ['Préparée pour l’export international','Challenge Food prépare les offres export selon les besoins de l’acheteur : grade, longueur, humidité, quantité, conditionnement et documents de destination.']
      ],
      storyCta:'Découvrir toute la boutique',
      shopKicker:'Boutique Challenge Food',shopTitle:'Toute notre gamme vanille',
      shopIntro:'Ajoutez plusieurs produits au même panier puis validez une seule demande. Les prix sont confirmés selon le lot, le conditionnement et la destination.',
      music:'♫ Musique boutique',industrialShortcut:'Grands achats +25 kg',cart:'Panier',
      products:{
        'grade-a':['Grade A · Gourmet','Gousses Bourbon Premium','Gousses entières sélectionnées pour gastronomie, pâtisserie et distribution premium.','Gousses Bourbon Grade A / Gourmet'],
        'grade-b':['Grade B · Extraction','Vanille pour extraction','Lots destinés aux extracteurs, fabricants d’arômes et applications industrielles.','Gousses Grade B / Extraction'],
        'extract-1l':['Extrait · 1L','Extrait de vanille de Madagascar','Format professionnel d’un litre pour usages alimentaires et transformation.','Extrait de vanille de Madagascar 1L'],
        powder:['Poudre','Poudre de vanille','Vanille moulue pour formulation, pâtisserie et applications professionnelles.','Poudre de vanille de Madagascar'],
        seeds:['Graines','Graines de vanille','Pour préparations, inclusions et applications de transformation.','Graines de vanille'],
        'organic-nop':['Certification sur lot','Bio / NOP','Lots certifiés proposés selon disponibilité et vérification documentaire.','Vanille Bio / NOP'],
        fairtrade:['Certification sur lot','Fairtrade','Vanille certifiée Fairtrade lorsqu’un lot éligible est disponible.','Vanille Fairtrade'],
        oleoresin:['Concentré','Oléorésine / Concentrés','Demandes techniques selon fold, support, solvant et spécifications analytiques.','Oléorésine / Concentré de vanille'],
        custom:['Sur mesure','Lot & conditionnement personnalisé','Longueur, humidité, emballage sous vide, conditionnement industriel ou programme récurrent.','Lot sur mesure & conditionnement']
      },
      price:'Prix sur devis',add:'Ajouter au panier',added:'Ajouté ✓',
      industrialKicker:'POUR GRANDS ACHATS',industrialTitle:'Achat industriel — à partir de 25 kg',
      industrialText:'Pour importateurs, distributeurs, fabricants, extracteurs et acheteurs professionnels. Indiquez le produit, le volume et la destination pour recevoir une proposition adaptée.',
      industrialPoints:['Minimum industriel : <strong>25 kg</strong>','Conditionnement export','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['Produit *','Quantité en kg *','Société / Acheteur *','Email professionnel *','Pays / Port de destination *','Incoterm','Spécifications / Message'],
      industrialPlaceholder:'Longueur, humidité, certification, conditionnement, fréquence d’achat…',
      industrialSubmit:'Demander un devis industriel +25 kg',
      cartTitle:'Votre panier',cartEmpty:'Votre panier est vide.',
      cartNote:'Les prix, l’expédition et le paiement sont confirmés après validation de la destination.',
      continuePay:'Continuer vers le paiement',qtyIn:'Quantité en',remove:'Retirer',
      checkoutKicker:'Commande sécurisée',checkoutTitle:'Finaliser la commande',
      checkoutNote:'Votre panier est transmis à Challenge Food. Le montant final et le lien de paiement sécurisé sont envoyés après confirmation du transport et des spécifications.',
      checkoutLabels:['Société / Nom *','Email *','Pays *','Téléphone / WhatsApp','Adresse / destination *','Message'],
      checkoutPlaceholder:'Conditionnement, Incoterm, délai souhaité…',
      checkoutSubmit:'Valider la commande et demander le lien de paiement',
      sound:'Son'
    },
    tr:{
      nav:['Ana Sayfa','Şirket','Menşe','RSE','Kaynaklar','Mağaza','Kalite','Belgeler','İletişim / Teklif'],
      page:['Ana Sayfa','Şirket','Menşe','RSE','Kaynaklar','Mağaza','Kalite','Belgeler','İletişim / Teklif'],
      storyKicker:'Sambava · Madagaskar Bourbon Vanilyası',
      storyTitle:'Sambava çiftliklerinden uluslararası alıcılara',
      story:[
        ['Sambava, vanilyamızın doğduğu yer','Madagaskar’ın kuzeydoğusundaki Sambava, Bourbon vanilya üretiminin tarihî merkezlerinden biridir. Challenge Food, bu menşeden Madagaskar vanilyasını uluslararası profesyonel alıcılarla buluşturur.'],
        ['Malgaş üreticilerin yaşattığı gelenek','Vanilya çiçekleri, kuşaktan kuşağa aktarılan bilgiyle üreticiler tarafından elle tozlaştırılır. Bu titiz çalışma her kapsülün gelecekteki kalitesini belirler.'],
        ['Bourbon aromasını geliştiren yavaş kürleme','Hasattan sonra yeşil vanilya kapsülleri hazırlama, kontrollü kurutma, terletme ve olgunlaştırma aşamalarından geçer. Bu süreç Madagaskar Bourbon vanilyasının karakteristik renk, doku ve aromasını oluşturur.'],
        ['Uluslararası ihracata hazırlanır','Challenge Food ihracat tekliflerini alıcının kalite, uzunluk, nem, miktar, ambalaj ve varış belgesi gereksinimlerine göre hazırlar.']
      ],
      storyCta:'Tüm mağazayı keşfedin',
      shopKicker:'Challenge Food Mağazası',shopTitle:'Tüm vanilya ürünlerimiz',
      shopIntro:'Birden fazla ürünü aynı sepete ekleyin ve tek talepte gönderin. Fiyatlar partiye, ambalaja ve varış noktasına göre teyit edilir.',
      music:'♫ Mağaza müziği',industrialShortcut:'Toplu alım +25 kg',cart:'Sepet',
      products:{
        'grade-a':['A Kalite · Gurme','Premium Bourbon Vanilya Çubukları','Gastronomi, pastacılık ve premium dağıtım için seçilmiş bütün çubuklar.','A Kalite / Gurme Bourbon Vanilya'],
        'grade-b':['B Kalite · Ekstraksiyon','Ekstraksiyonluk vanilya','Ekstraktörler, aroma üreticileri ve endüstriyel uygulamalar için partiler.','B Kalite / Ekstraksiyon Vanilyası'],
        'extract-1l':['Ekstrakt · 1L','Madagaskar Vanilya Ekstraktı','Gıda uygulamaları ve işleme için profesyonel 1 litrelik format.','Madagaskar Vanilya Ekstraktı 1L'],
        powder:['Toz','Vanilya tozu','Formülasyon, pastacılık ve profesyonel uygulamalar için öğütülmüş vanilya.','Madagaskar Vanilya Tozu'],
        seeds:['Tohum','Vanilya tohumları','Hazırlıklar, dolgular ve işleme uygulamaları için.','Vanilya Tohumları'],
        'organic-nop':['Parti sertifikası','Organik / NOP','Uygunluk ve belge kontrolüne bağlı sertifikalı partiler.','Organik / NOP Vanilya'],
        fairtrade:['Parti sertifikası','Fairtrade','Uygun sertifikalı parti bulunduğunda Fairtrade vanilya.','Fairtrade Vanilya'],
        oleoresin:['Konsantre','Oleorezin / Konsantre','Fold, taşıyıcı, solvent ve analiz şartlarına göre teknik talepler.','Vanilya Oleorezin / Konsantre'],
        custom:['Özel','Özel parti ve ambalaj','Uzunluk, nem, vakum ambalaj, endüstriyel paketleme veya düzenli tedarik.','Özel Parti ve Ambalaj']
      },
      price:'Teklif üzerine',add:'Sepete ekle',added:'Eklendi ✓',
      industrialKicker:'TOPLU ALIM',industrialTitle:'Endüstriyel alım — 25 kg’dan itibaren',
      industrialText:'İthalatçılar, distribütörler, üreticiler, ekstraktörler ve profesyonel alıcılar için. Hacme uygun teklif almak için ürün, miktar ve varış noktasını belirtin.',
      industrialPoints:['Endüstriyel minimum: <strong>25 kg</strong>','İhracat ambalajı','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['Ürün *','Miktar (kg) *','Şirket / Alıcı *','İş e-postası *','Ülke / Varış limanı *','Incoterm','Özellikler / Mesaj'],
      industrialPlaceholder:'Uzunluk, nem, sertifika, ambalaj, satın alma sıklığı…',
      industrialSubmit:'+25 kg endüstriyel teklif iste',
      cartTitle:'Sepetiniz',cartEmpty:'Sepetiniz boş.',
      cartNote:'Fiyat, sevkiyat ve ödeme varış noktası onaylandıktan sonra kesinleştirilir.',
      continuePay:'Ödemeye devam et',qtyIn:'Miktar birimi',remove:'Kaldır',
      checkoutKicker:'Güvenli sipariş',checkoutTitle:'Siparişi tamamlayın',
      checkoutNote:'Sepetiniz Challenge Food’a iletilir. Nihai tutar ve güvenli ödeme bağlantısı nakliye ve özellikler onaylandıktan sonra gönderilir.',
      checkoutLabels:['Şirket / Ad *','E-posta *','Ülke *','Telefon / WhatsApp','Adres / varış *','Mesaj'],
      checkoutPlaceholder:'Ambalaj, Incoterm, istenen teslim süresi…',
      checkoutSubmit:'Siparişi onayla ve ödeme bağlantısı iste',
      sound:'Ses'
    },
    ru:{
      nav:['Главная','Компания','Происхождение','RSE','Ресурсы','Магазин','Качество','Документы','Контакт / Запрос'],
      page:['Главная','Компания','Происхождение','RSE','Ресурсы','Магазин','Качество','Документы','Контакт / Запрос'],
      storyKicker:'Самбава · Бурбонская ваниль Мадагаскара',
      storyTitle:'От ферм Самбавы до международных покупателей',
      story:[
        ['Самбава — родина нашей ванили','На северо-востоке Мадагаскара Самбава является одним из исторических центров производства бурбонской ванили. Challenge Food связывает это происхождение с международными профессиональными покупателями.'],
        ['Традиция, которую сохраняют малагасийские фермеры','Цветы ванили опыляются вручную фермерами по знаниям, передаваемым из поколения в поколение. Эта тщательная работа определяет будущие качества каждого стручка.'],
        ['Медленная обработка для аромата Bourbon','После сбора зелёные стручки проходят подготовку, контролируемую сушку, пропаривание и созревание. Эти этапы формируют характерные цвет, текстуру и аромат мадагаскарской бурбонской ванили.'],
        ['Подготовлено для международного экспорта','Challenge Food готовит экспортные предложения по требованиям покупателя: сорт, длина, влажность, количество, упаковка и документы назначения.']
      ],
      storyCta:'Открыть весь магазин',
      shopKicker:'Магазин Challenge Food',shopTitle:'Весь ассортимент ванили',
      shopIntro:'Добавьте несколько товаров в одну корзину и отправьте единый запрос. Цена подтверждается по партии, упаковке и направлению.',
      music:'♫ Музыка магазина',industrialShortcut:'Опт +25 кг',cart:'Корзина',
      products:{
        'grade-a':['Grade A · Gourmet','Премиальные стручки Bourbon','Цельные отборные стручки для гастрономии, кондитерского производства и премиальной дистрибуции.','Стручки Bourbon Grade A / Gourmet'],
        'grade-b':['Grade B · Экстракция','Ваниль для экстракции','Партии для экстракторов, производителей ароматизаторов и промышленного использования.','Стручки Grade B / Extraction'],
        'extract-1l':['Экстракт · 1 л','Экстракт ванили Мадагаскара','Профессиональный формат 1 литр для пищевых применений и переработки.','Экстракт ванили Мадагаскара 1 л'],
        powder:['Порошок','Ванильный порошок','Молотая ваниль для рецептур, кондитерского производства и профессионального применения.','Порошок ванили Мадагаскара'],
        seeds:['Семена','Семена ванили','Для приготовления, включений и переработки.','Семена ванили'],
        'organic-nop':['Сертификация партии','Organic / NOP','Сертифицированные партии при наличии и после проверки документов.','Ваниль Organic / NOP'],
        fairtrade:['Сертификация партии','Fairtrade','Сертифицированная Fairtrade ваниль при наличии подходящей партии.','Ваниль Fairtrade'],
        oleoresin:['Концентрат','Олеорезин / Концентраты','Технические запросы по кратности, носителю, растворителю и аналитическим параметрам.','Олеорезин / Концентрат ванили'],
        custom:['Под заказ','Партия и упаковка под заказ','Длина, влажность, вакуумная или промышленная упаковка, регулярные поставки.','Партия и упаковка под заказ']
      },
      price:'Цена по запросу',add:'В корзину',added:'Добавлено ✓',
      industrialKicker:'ОПТОВЫЕ ПОКУПКИ',industrialTitle:'Промышленная закупка — от 25 кг',
      industrialText:'Для импортёров, дистрибьюторов, производителей, экстракторов и профессиональных покупателей. Укажите товар, объём и назначение для предложения по объёму.',
      industrialPoints:['Минимум: <strong>25 кг</strong>','Экспортная упаковка','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['Товар *','Количество, кг *','Компания / Покупатель *','Рабочий email *','Страна / Порт назначения *','Incoterm','Спецификации / Сообщение'],
      industrialPlaceholder:'Длина, влажность, сертификация, упаковка, частота закупок…',
      industrialSubmit:'Запросить промышленное предложение +25 кг',
      cartTitle:'Ваша корзина',cartEmpty:'Корзина пуста.',
      cartNote:'Цена, доставка и оплата подтверждаются после проверки места назначения.',
      continuePay:'Перейти к оплате',qtyIn:'Количество в',remove:'Удалить',
      checkoutKicker:'Безопасный заказ',checkoutTitle:'Завершить заказ',
      checkoutNote:'Корзина отправляется Challenge Food. Итоговая сумма и защищённая ссылка на оплату направляются после подтверждения доставки и спецификаций.',
      checkoutLabels:['Компания / Имя *','Email *','Страна *','Телефон / WhatsApp','Адрес / назначение *','Сообщение'],
      checkoutPlaceholder:'Упаковка, Incoterm, желаемый срок…',
      checkoutSubmit:'Подтвердить заказ и запросить ссылку на оплату',
      sound:'Звук'
    },
    zh:{
      nav:['首页','公司','产地','RSE','买家资源','商店','质量','资质','联系 / 询价'],
      page:['首页','公司','产地','RSE','买家资源','商店','质量','资质','联系 / 询价'],
      storyKicker:'桑巴瓦 · 马达加斯加波旁香草',
      storyTitle:'从桑巴瓦农场到国际买家',
      story:[
        ['桑巴瓦，我们香草的发源地','马达加斯加东北部的桑巴瓦是波旁香草历史悠久的生产中心之一。Challenge Food 从原产地连接马达加斯加香草资源与国际专业买家。'],
        ['由马达加斯加种植者延续的传统','香草花由种植者按照代代相传的技艺手工授粉。这一细致工作决定每根香草荚未来的品质。'],
        ['缓慢处理，形成波旁香气','采收后，绿色香草荚经过准备、受控干燥、发汗和熟化。这些步骤形成马达加斯加波旁香草特有的颜色、质地和香气。'],
        ['为国际出口做好准备','Challenge Food 根据买家的等级、长度、含水率、数量、包装和目的地文件要求准备出口方案。']
      ],
      storyCta:'查看全部商品',
      shopKicker:'Challenge Food 商店',shopTitle:'完整香草产品系列',
      shopIntro:'可将多种产品加入同一购物车并一次提交需求。价格根据批次、包装和目的地确认。',
      music:'♫ 商店音乐',industrialShortcut:'大宗采购 +25 公斤',cart:'购物车',
      products:{
        'grade-a':['A级 · 精品','优质波旁香草荚','精选完整香草荚，适用于餐饮、烘焙和高端分销。','A级 / 精品波旁香草荚'],
        'grade-b':['B级 · 提取','提取用香草','适用于提取商、香精制造和工业用途的批次。','B级 / 提取用香草荚'],
        'extract-1l':['提取物 · 1L','马达加斯加香草提取物','1升专业规格，适用于食品和加工用途。','马达加斯加香草提取物 1L'],
        powder:['粉末','香草粉','用于配方、烘焙和专业应用的研磨香草。','马达加斯加香草粉'],
        seeds:['香草籽','香草籽','适用于配制、添加和加工应用。','香草籽'],
        'organic-nop':['批次认证','有机 / NOP','根据库存和文件核验提供认证批次。','有机 / NOP 香草'],
        fairtrade:['批次认证','Fairtrade','有符合条件的认证批次时提供 Fairtrade 香草。','Fairtrade 香草'],
        oleoresin:['浓缩物','油树脂 / 浓缩物','按倍数、载体、溶剂和分析规格处理技术需求。','香草油树脂 / 浓缩物'],
        custom:['定制','定制批次与包装','长度、含水率、真空包装、工业包装或长期供应计划。','定制批次与包装']
      },
      price:'询价',add:'加入购物车',added:'已加入 ✓',
      industrialKicker:'大宗采购',industrialTitle:'工业采购 — 25 公斤起',
      industrialText:'面向进口商、分销商、制造商、提取商和专业买家。请注明产品、数量和目的地，以获得对应数量的报价。',
      industrialPoints:['工业最低量：<strong>25 公斤</strong>','出口包装','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['产品 *','数量（公斤）*','公司 / 买家 *','商务邮箱 *','国家 / 目的港 *','Incoterm','规格 / 留言'],
      industrialPlaceholder:'长度、含水率、认证、包装、采购频率…',
      industrialSubmit:'申请 +25 公斤工业报价',
      cartTitle:'您的购物车',cartEmpty:'购物车为空。',
      cartNote:'价格、运输和付款将在目的地确认后确定。',
      continuePay:'继续付款',qtyIn:'数量单位',remove:'删除',
      checkoutKicker:'安全订单',checkoutTitle:'完成订单',
      checkoutNote:'您的购物车将发送给 Challenge Food。运输和规格确认后，我们会发送最终金额和安全付款链接。',
      checkoutLabels:['公司 / 姓名 *','邮箱 *','国家 *','电话 / WhatsApp','地址 / 目的地 *','留言'],
      checkoutPlaceholder:'包装、Incoterm、期望交期…',
      checkoutSubmit:'确认订单并索取付款链接',
      sound:'声音'
    },
    ar:{
      nav:['الرئيسية','الشركة','المنشأ','RSE','موارد المشترين','المتجر','الجودة','الوثائق','اتصال / عرض سعر'],
      page:['الرئيسية','الشركة','المنشأ','RSE','موارد المشترين','المتجر','الجودة','الوثائق','اتصال / عرض سعر'],
      storyKicker:'سامبافا · فانيليا بوربون من مدغشقر',
      storyTitle:'من مزارع سامبافا إلى المشترين الدوليين',
      story:[
        ['سامبافا، موطن فانيليتنا','تقع سامبافا في شمال شرق مدغشقر وهي أحد المراكز التاريخية لإنتاج فانيليا بوربون. تربط Challenge Food موارد الفانيليا المالاغاشية بالمشترين المحترفين الدوليين من هذا المنشأ.'],
        ['تقليد يحافظ عليه المزارعون المالاغاشيون','يتم تلقيح أزهار الفانيليا يدوياً على يد المزارعين وفق معرفة متوارثة عبر الأجيال. ويحدد هذا العمل الدقيق الجودة المستقبلية لكل قرن.'],
        ['معالجة بطيئة لتطوير رائحة بوربون','بعد الحصاد تمر القرون الخضراء بمراحل التحضير والتجفيف المنضبط والتعرق والنضج. وتنتج هذه المراحل اللون والقوام والرائحة المميزة لفانيليا بوربون من مدغشقر.'],
        ['مجهزة للتصدير الدولي','تعد Challenge Food عروض التصدير وفق متطلبات المشتري من الدرجة والطول والرطوبة والكمية والتعبئة ووثائق الوجهة.']
      ],
      storyCta:'استكشف المتجر بالكامل',
      shopKicker:'متجر Challenge Food',shopTitle:'مجموعة الفانيليا الكاملة',
      shopIntro:'أضف عدة منتجات إلى سلة واحدة ثم أرسل طلباً واحداً. يتم تأكيد الأسعار حسب الدفعة والتعبئة والوجهة.',
      music:'♫ موسيقى المتجر',industrialShortcut:'شراء بالجملة +25 كغ',cart:'السلة',
      products:{
        'grade-a':['الدرجة A · فاخرة','قرون بوربون ممتازة','قرون كاملة مختارة لفنون الطهي والحلويات والتوزيع الممتاز.','قرون بوربون الدرجة A / فاخرة'],
        'grade-b':['الدرجة B · استخلاص','فانيليا للاستخلاص','دفعات للمستخلصين ومصنعي النكهات والاستخدامات الصناعية.','قرون الدرجة B / للاستخلاص'],
        'extract-1l':['مستخلص · 1 لتر','مستخلص فانيليا مدغشقر','عبوة مهنية 1 لتر للاستخدامات الغذائية والتصنيع.','مستخلص فانيليا مدغشقر 1 لتر'],
        powder:['مسحوق','مسحوق الفانيليا','فانيليا مطحونة للتركيبات والحلويات والاستخدامات المهنية.','مسحوق فانيليا مدغشقر'],
        seeds:['بذور','بذور الفانيليا','للتحضيرات والإضافات وتطبيقات المعالجة.','بذور الفانيليا'],
        'organic-nop':['شهادة الدفعة','عضوي / NOP','دفعات معتمدة حسب التوفر والتحقق من الوثائق.','فانيليا عضوية / NOP'],
        fairtrade:['شهادة الدفعة','Fairtrade','فانيليا معتمدة Fairtrade عند توفر دفعة مؤهلة.','فانيليا Fairtrade'],
        oleoresin:['مركز','أوليورزين / مركزات','طلبات فنية حسب fold والناقل والمذيب والمواصفات التحليلية.','أوليورزين / مركز الفانيليا'],
        custom:['مخصص','دفعة وتعبئة مخصصة','الطول والرطوبة والتعبئة بالتفريغ أو الصناعية أو برنامج توريد متكرر.','دفعة وتعبئة مخصصة']
      },
      price:'السعر حسب العرض',add:'أضف إلى السلة',added:'تمت الإضافة ✓',
      industrialKicker:'المشتريات بالجملة',industrialTitle:'شراء صناعي — من 25 كغ',
      industrialText:'للمستوردين والموزعين والمصنعين والمستخلصين والمشترين المحترفين. حدد المنتج والكمية والوجهة للحصول على عرض مناسب للحجم.',
      industrialPoints:['الحد الأدنى الصناعي: <strong>25 كغ</strong>','تعبئة للتصدير','FOB · CIF · CIP · CFR · EXW'],
      industrialLabels:['المنتج *','الكمية بالكيلوغرام *','الشركة / المشتري *','البريد المهني *','الدولة / ميناء الوجهة *','Incoterm','المواصفات / الرسالة'],
      industrialPlaceholder:'الطول، الرطوبة، الشهادة، التعبئة، وتيرة الشراء…',
      industrialSubmit:'طلب عرض صناعي +25 كغ',
      cartTitle:'سلتك',cartEmpty:'السلة فارغة.',
      cartNote:'يتم تأكيد السعر والشحن والدفع بعد اعتماد الوجهة.',
      continuePay:'المتابعة إلى الدفع',qtyIn:'الكمية بوحدة',remove:'إزالة',
      checkoutKicker:'طلب آمن',checkoutTitle:'إتمام الطلب',
      checkoutNote:'يتم إرسال سلتك إلى Challenge Food. يُرسل المبلغ النهائي ورابط الدفع الآمن بعد تأكيد النقل والمواصفات.',
      checkoutLabels:['الشركة / الاسم *','البريد الإلكتروني *','الدولة *','الهاتف / WhatsApp','العنوان / الوجهة *','الرسالة'],
      checkoutPlaceholder:'التعبئة، Incoterm، مدة التسليم المطلوبة…',
      checkoutSubmit:'تأكيد الطلب وطلب رابط الدفع',
      sound:'الصوت'
    }
  };

  const RSE_TEXT = {
    en:{kicker:'Social & territorial responsibility',title:'Growing together with Ambohimitsinjo, Sambava',lead:'Challenge Food develops responsible sourcing relationships with qualified producers who are trained and supported in the Commune of Ambohimitsinjo, Sambava, Madagascar.',p1t:'Supported producers',p1d:'Training, technical support, quality improvement and practices aligned with market requirements.',p2t:'Local education',p2d:'Supporting local development, including the creation and support of schools in the sourcing area.',p3t:'Dynamic agroforestry',p3d:'Reforestation, plantation monitoring and support for vanilla plots through an agroforestry approach.',impactKicker:'Actions in the territory',impactTitle:'A supply chain that also contributes to local development',eduTitle:'Education & communities',eduText:'Investing in children’s future and strengthening useful infrastructure for local communities.',schoolTitle:'Local schools',schoolText:'Concrete actions carried out close to families and villages in the sourcing area.',communityTitle:'Territorial development',communityText:'An approach combining economic activity, social support and local opportunities.',treeTitle:'Monitored reforestation',treeText:'Plantations are monitored over time to strengthen establishment and ecological contribution.',agroTitle:'Agroforestry for vanilla plots',agroText:'Supporting vegetation restoration and plot management for production better integrated into the landscape.'},
    fr:{kicker:'Responsabilité sociale & territoriale',title:'Grandir avec Ambohimitsinjo, Sambava',lead:"Challenge Food développe une relation d'achat responsable avec des producteurs qualifiés, formés et accompagnés dans la Commune d'Ambohimitsinjo, Sambava, Madagascar.",p1t:'Producteurs accompagnés',p1d:'Formation, accompagnement technique, qualité et pratiques adaptées aux exigences du marché.',p2t:'Éducation locale',p2d:"Soutien au développement de la zone, notamment par la création et l'appui à des écoles locales.",p3t:'Agroforesterie dynamique',p3d:'Reboisement, suivi des plantations et accompagnement des parcelles de vanille dans une logique agroforestière.',impactKicker:'Actions dans le territoire',impactTitle:"Une chaîne d'approvisionnement qui contribue aussi au développement local",eduTitle:'Éducation & communautés',eduText:"Investir dans l'avenir des enfants et renforcer les infrastructures utiles aux communautés locales.",schoolTitle:'Écoles locales',schoolText:"Des actions concrètes menées au plus près des familles et des villages de la zone d'approvisionnement.",communityTitle:'Développement de la zone',communityText:'Une approche territoriale qui associe activité économique, accompagnement social et perspectives locales.',treeTitle:'Reboisement suivi',treeText:'Les plantations sont suivies dans le temps afin de renforcer leur installation et leur contribution écologique.',agroTitle:'Agroforesterie des parcelles de vanille',agroText:'Accompagner la restauration végétale et la gestion des parcelles pour une production mieux intégrée au paysage.'},
    tr:{kicker:'Sosyal ve bölgesel sorumluluk',title:'Ambohimitsinjo, Sambava ile birlikte büyümek',lead:'Challenge Food, Madagaskar Sambava’daki Ambohimitsinjo Belediyesi’nde eğitim alan ve desteklenen nitelikli üreticilerle sorumlu tedarik ilişkileri geliştirir.',p1t:'Desteklenen üreticiler',p1d:'Eğitim, teknik destek, kalite geliştirme ve pazar gerekliliklerine uygun uygulamalar.',p2t:'Yerel eğitim',p2d:'Tedarik bölgesinde okul kurulması ve desteklenmesi dâhil yerel kalkınmaya katkı.',p3t:'Dinamik agroforestry',p3d:'Ağaçlandırma, dikimlerin takibi ve vanilya parsellerinin agroforestry yaklaşımıyla desteklenmesi.',impactKicker:'Bölgedeki çalışmalar',impactTitle:'Yerel kalkınmaya da katkı sağlayan bir tedarik zinciri',eduTitle:'Eğitim ve topluluklar',eduText:'Çocukların geleceğine yatırım yapmak ve yerel topluluklara yararlı altyapıyı güçlendirmek.',schoolTitle:'Yerel okullar',schoolText:'Tedarik alanındaki ailelere ve köylere yakın somut faaliyetler.',communityTitle:'Bölgesel kalkınma',communityText:'Ekonomik faaliyeti, sosyal desteği ve yerel fırsatları birleştiren yaklaşım.',treeTitle:'İzlenen ağaçlandırma',treeText:'Dikimler, tutunmalarını ve ekolojik katkılarını güçlendirmek için zaman içinde izlenir.',agroTitle:'Vanilya parsellerinde agroforestry',agroText:'Üretimi peyzaja daha iyi entegre etmek için bitki örtüsü restorasyonu ve parsel yönetimini desteklemek.'},
    ru:{kicker:'Социальная и территориальная ответственность',title:'Развиваемся вместе с Амбухимицинжу, Самбава',lead:'Challenge Food развивает ответственную закупочную модель с квалифицированными производителями, которые проходят обучение и получают сопровождение в коммуне Амбухимицинжу, Самбава, Мадагаскар.',p1t:'Поддержка производителей',p1d:'Обучение, техническое сопровождение, качество и практики, соответствующие требованиям рынка.',p2t:'Местное образование',p2d:'Поддержка развития территории, включая создание и поддержку местных школ.',p3t:'Динамическая агролесомелиорация',p3d:'Лесовосстановление, мониторинг посадок и сопровождение ванильных участков в агролесоводческой системе.',impactKicker:'Действия на территории',impactTitle:'Цепочка поставок, которая также способствует местному развитию',eduTitle:'Образование и сообщества',eduText:'Инвестиции в будущее детей и укрепление полезной инфраструктуры для местных сообществ.',schoolTitle:'Местные школы',schoolText:'Конкретные действия рядом с семьями и деревнями в зоне закупок.',communityTitle:'Развитие территории',communityText:'Подход, объединяющий экономическую деятельность, социальную поддержку и местные перспективы.',treeTitle:'Мониторинг лесовосстановления',treeText:'Посадки отслеживаются во времени для повышения приживаемости и экологического эффекта.',agroTitle:'Агролесоводство на ванильных участках',agroText:'Поддержка восстановления растительности и управления участками для лучшей интеграции производства в ландшафт.'},
    zh:{kicker:'社会与区域责任',title:'与安布希米钦朱和桑巴瓦共同发展',lead:'Challenge Food 在马达加斯加桑巴瓦的安布希米钦朱市与经过培训、指导并符合要求的生产者建立负责任的采购关系。',p1t:'生产者培训与支持',p1d:'提供培训、技术支持、质量提升以及符合市场要求的实践指导。',p2t:'当地教育',p2d:'支持采购区的发展，包括建设和支持当地学校。',p3t:'动态农林复合系统',p3d:'开展植树造林、持续监测种植成果，并以农林复合方式支持香草地块。',impactKicker:'区域行动',impactTitle:'让供应链同时促进当地发展',eduTitle:'教育与社区',eduText:'投资儿童未来，并加强对当地社区有用的基础设施。',schoolTitle:'当地学校',schoolText:'在采购区家庭和村庄附近开展具体行动。',communityTitle:'区域发展',communityText:'将经济活动、社会支持和本地发展机会结合起来。',treeTitle:'持续跟踪的植树造林',treeText:'对种植进行持续监测，以提高成活和生态贡献。',agroTitle:'香草地块农林复合经营',agroText:'支持植被恢复和地块管理，使生产更好地融入当地景观。'},
    ar:{kicker:'المسؤولية الاجتماعية والإقليمية',title:'النمو مع أمبوهيميتسينجو، سامبافا',lead:'تطوّر Challenge Food علاقات شراء مسؤولة مع منتجين مؤهلين ومدرَّبين ومواكبين في بلدية أمبوهيميتسينجو، سامبافا، مدغشقر.',p1t:'دعم المنتجين',p1d:'التدريب والمواكبة التقنية وتحسين الجودة والممارسات الملائمة لمتطلبات السوق.',p2t:'التعليم المحلي',p2d:'دعم تنمية المنطقة، بما في ذلك إنشاء ودعم المدارس المحلية.',p3t:'الحراجة الزراعية الديناميكية',p3d:'إعادة التشجير ومتابعة الغرسات ومواكبة حقول الفانيليا ضمن نهج الحراجة الزراعية.',impactKicker:'أنشطة في المنطقة',impactTitle:'سلسلة توريد تساهم أيضاً في التنمية المحلية',eduTitle:'التعليم والمجتمعات',eduText:'الاستثمار في مستقبل الأطفال وتعزيز البنية التحتية المفيدة للمجتمعات المحلية.',schoolTitle:'المدارس المحلية',schoolText:'أنشطة ملموسة بالقرب من الأسر والقرى في منطقة التوريد.',communityTitle:'تنمية المنطقة',communityText:'نهج يجمع النشاط الاقتصادي والدعم الاجتماعي والفرص المحلية.',treeTitle:'إعادة تشجير مع المتابعة',treeText:'تتم متابعة الغرسات مع مرور الوقت لتعزيز نجاحها ومساهمتها البيئية.',agroTitle:'الحراجة الزراعية لحقول الفانيليا',agroText:'دعم استعادة الغطاء النباتي وإدارة الحقول من أجل إنتاج أكثر اندماجاً في المشهد الطبيعي.'}
  };

  const RESOURCE_TEXT = {
    en:{kicker:'Resources for professional buyers',title:'Documents, supplier verification and commercial information',intro:'Find the resources needed to qualify Challenge Food, understand our vanilla offer and prepare a professional enquiry.',c1t:'Madagascar Vanilla',c1d:'Grades, quality, packing, pricing and export basics.',c1a:'View the range',c2t:'Supplier & Wholesale',c2d:'Professional sourcing directly from Madagascar and industrial purchasing.',c2a:'Access +25 kg purchasing',c3t:'Quality & Documents',c3d:'Lot specifications, COA, packing and shipment documentation.',c3a:'View quality',c4t:'Supplier Verification',c4d:'Information useful for professional buyer due diligence.',c4a:'Verify Challenge Food',c5t:'About Challenge Food',c5d:'Company identity, registration, export activity and contact details.',c5a:'Discover the company'},
    fr:{kicker:'Ressources pour acheteurs professionnels',title:'Documents, vérification fournisseur et informations commerciales',intro:'Retrouvez les ressources utiles pour qualifier Challenge Food, comprendre notre offre vanille et préparer une demande professionnelle.',c1t:'Vanille de Madagascar',c1d:'Grades, qualité, conditionnement, prix et bases export.',c1a:'Voir la gamme',c2t:'Fournisseur & vente en gros',c2d:'Approvisionnement professionnel direct depuis Madagascar et achats industriels.',c2a:'Accéder aux achats +25 kg',c3t:'Qualité & documents',c3d:'Spécifications de lot, COA, conditionnement et documents d’expédition.',c3a:'Voir la qualité',c4t:'Vérification fournisseur',c4d:'Éléments utiles à la due diligence des acheteurs professionnels.',c4a:'Vérifier Challenge Food',c5t:'À propos de Challenge Food',c5d:'Identité de la société, immatriculation, activité export et coordonnées.',c5a:'Découvrir la société'},
    tr:{kicker:'Profesyonel alıcı kaynakları',title:'Belgeler, tedarikçi doğrulama ve ticari bilgiler',intro:'Challenge Food’u değerlendirmek, vanilya teklifimizi anlamak ve profesyonel talep hazırlamak için gerekli kaynaklar.',c1t:'Madagaskar Vanilyası',c1d:'Kaliteler, kalite, ambalaj, fiyat ve ihracat temelleri.',c1a:'Ürünleri görüntüle',c2t:'Tedarikçi & Toptan',c2d:'Madagaskar’dan doğrudan profesyonel tedarik ve endüstriyel alım.',c2a:'+25 kg alıma git',c3t:'Kalite & Belgeler',c3d:'Parti özellikleri, COA, ambalaj ve sevkiyat belgeleri.',c3a:'Kaliteyi görüntüle',c4t:'Tedarikçi Doğrulama',c4d:'Profesyonel alıcı durum tespiti için gerekli bilgiler.',c4a:'Challenge Food’u doğrula',c5t:'Challenge Food Hakkında',c5d:'Şirket kimliği, kayıt, ihracat faaliyeti ve iletişim bilgileri.',c5a:'Şirketi keşfet'},
    ru:{kicker:'Ресурсы для профессиональных покупателей',title:'Документы, проверка поставщика и коммерческая информация',intro:'Материалы для квалификации Challenge Food, понимания предложения по ванили и подготовки профессионального запроса.',c1t:'Ваниль Мадагаскара',c1d:'Сорта, качество, упаковка, цены и основы экспорта.',c1a:'Смотреть ассортимент',c2t:'Поставщик & Опт',c2d:'Профессиональные поставки напрямую с Мадагаскара и промышленные закупки.',c2a:'Закупки от 25 кг',c3t:'Качество & Документы',c3d:'Спецификации партий, COA, упаковка и отгрузочные документы.',c3a:'Смотреть качество',c4t:'Проверка поставщика',c4d:'Информация для due diligence профессиональных покупателей.',c4a:'Проверить Challenge Food',c5t:'О Challenge Food',c5d:'Данные компании, регистрация, экспортная деятельность и контакты.',c5a:'О компании'},
    zh:{kicker:'专业买家资源',title:'文件、供应商核验与商务信息',intro:'用于审核 Challenge Food、了解香草产品并准备专业询盘的资料。',c1t:'马达加斯加香草',c1d:'等级、质量、包装、价格及出口基础信息。',c1a:'查看产品系列',c2t:'供应商与批发',c2d:'从马达加斯加直接进行专业采购和工业采购。',c2a:'进入 25 公斤以上采购',c3t:'质量与文件',c3d:'批次规格、COA、包装及运输文件。',c3a:'查看质量',c4t:'供应商核验',c4d:'专业买家尽职调查所需的信息。',c4a:'核验 Challenge Food',c5t:'关于 Challenge Food',c5d:'公司身份、注册、出口业务和联系方式。',c5a:'了解公司'},
    ar:{kicker:'موارد للمشترين المحترفين',title:'الوثائق والتحقق من المورد والمعلومات التجارية',intro:'موارد لتأهيل Challenge Food وفهم عرض الفانيليا وإعداد طلب مهني.',c1t:'فانيليا مدغشقر',c1d:'الدرجات والجودة والتعبئة والأسعار وأساسيات التصدير.',c1a:'عرض المنتجات',c2t:'المورد والبيع بالجملة',c2d:'توريد مهني مباشر من مدغشقر ومشتريات صناعية.',c2a:'الشراء من 25 كغ',c3t:'الجودة والوثائق',c3d:'مواصفات الدفعات وCOA والتعبئة ووثائق الشحن.',c3a:'عرض الجودة',c4t:'التحقق من المورد',c4d:'معلومات مفيدة للعناية الواجبة للمشترين المحترفين.',c4a:'التحقق من Challenge Food',c5t:'حول Challenge Food',c5d:'هوية الشركة والتسجيل ونشاط التصدير وبيانات الاتصال.',c5a:'اكتشف الشركة'}
  };

  const $ = (s,root=document)=>root.querySelector(s);
  const $$ = (s,root=document)=>[...root.querySelectorAll(s)];
  const set = (s,v)=>{const el=$(s);if(el&&v!==undefined&&el.textContent!==v)el.textContent=v;};
  const setHTML=(s,v)=>{const el=$(s);if(el&&v!==undefined&&el.innerHTML!==v)el.innerHTML=v;};

  function lang(){ return $('#language-select')?.value || localStorage.getItem('cfood-language') || 'en'; }

  function applyProducts(d){
    $$('.shop-card[data-id]').forEach(card=>{
      const p=d.products[card.dataset.id]; if(!p)return;
      card.dataset.name=p[3];
      const badge=$('.shop-badge',card),title=$('h3',card),desc=$('p',card),price=$('.shop-price',card),btn=$('.add-cart',card);
      if(badge&&badge.textContent!==p[0])badge.textContent=p[0];
      if(title&&title.textContent!==p[1])title.textContent=p[1];
      if(desc&&desc.textContent!==p[2])desc.textContent=p[2];
      if(price&&price.textContent!==d.price)price.textContent=d.price;
      if(btn && !btn.textContent.includes('✓') && btn.textContent!==d.add)btn.textContent=d.add;
    });
    const sel=$('#industrial-product');
    if(sel){
      [...sel.options].forEach((opt,i)=>{const p=Object.values(d.products)[i];if(p)opt.textContent=p[3];});
    }
  }

  function translateCartRows(d){
    $$('.cart-row').forEach(row=>{
      const id=row.dataset.cartId;
      const p=d.products[id];
      if(p){ const strong=$('strong',row); if(strong&&strong.textContent!==p[3])strong.textContent=p[3]; }
      const unit=id==='extract-1l'?(lang()==='fr'?'bouteille':lang()==='tr'?'şişe':lang()==='ru'?'бутылка':lang()==='zh'?'瓶':lang()==='ar'?'زجاجة':'bottle'):(id==='custom'?(lang()==='fr'?'lot':lang()==='tr'?'parti':lang()==='ru'?'партия':lang()==='zh'?'批次':lang()==='ar'?'دفعة':'lot'):'kg');
      const sm=$('small',row); const qtxt=d.qtyIn+' '+unit; if(sm&&sm.textContent!==qtxt)sm.textContent=qtxt;
      const rm=$('.cart-remove',row); if(rm&&rm.textContent!==d.remove)rm.textContent=d.remove;
    });
  }

  function apply(){
    const code=EXTRA[lang()] ? lang() : 'en';
    const d=EXTRA[code];

    const links=$$('.main-nav a');
    d.nav.forEach((txt,i)=>{if(links[i])links[i].textContent=txt;});

    set('.story-heading .section-kicker',d.storyKicker); set('#story-title',d.storyTitle);
    $$('.story-step').forEach((step,i)=>{const pair=d.story[i];if(!pair)return;const h=$('h3',step),p=$('p',step);if(h)h.textContent=pair[0];if(p)p.textContent=pair[1];});
    set('.story-cta span',d.storyCta);

    set('#boutique .shop-head .section-kicker',d.shopKicker); set('#shop-title',d.shopTitle); set('#boutique .shop-head p',d.shopIntro);
    setHTML('.shop-music',d.music); set('.industrial-shortcut',d.industrialShortcut);
    const cartBtn=$('.cart-open'); if(cartBtn)cartBtn.innerHTML=d.cart+' <strong class="cart-count">'+($('.cart-count')?.textContent||'0')+'</strong>';

    applyProducts(d);

    set('.industrial-kicker',d.industrialKicker); set('#industrial-buy h3',d.industrialTitle); set('#industrial-buy .industrial-copy p',d.industrialText);
    $$('.industrial-points span').forEach((el,i)=>{if(d.industrialPoints[i])el.innerHTML=d.industrialPoints[i];});
    $$('.industrial-form label').forEach((label,i)=>{
      if(!d.industrialLabels[i])return;
      for(const node of label.childNodes){if(node.nodeType===Node.TEXT_NODE){node.nodeValue=d.industrialLabels[i]+' ';break;}}
    });
    const industrialTA=$('.industrial-form textarea');if(industrialTA)industrialTA.placeholder=d.industrialPlaceholder;
    set('.industrial-submit',d.industrialSubmit);

    set('.shop-cart-head small',d.shopKicker); set('.shop-cart-head h3',d.cartTitle); set('.cart-empty',d.cartEmpty); set('.shop-cart-foot p',d.cartNote); set('.checkout-open',d.continuePay);
    set('.checkout-panel .section-kicker',d.checkoutKicker); set('#checkout-title',d.checkoutTitle); set('.checkout-note',d.checkoutNote);
    $$('.checkout-form label').forEach((label,i)=>{
      if(!d.checkoutLabels[i])return;
      for(const node of label.childNodes){if(node.nodeType===Node.TEXT_NODE){node.nodeValue=d.checkoutLabels[i]+' ';break;}}
    });
    const checkoutTA=$('.checkout-form textarea');if(checkoutTA)checkoutTA.placeholder=d.checkoutPlaceholder;
    set('.checkout-submit',d.checkoutSubmit);
    set('.sound-label',d.sound);

    const rse=RSE_TEXT[code]||RSE_TEXT.en;
    $('[data-rse]').forEach(el=>{const k=el.dataset.rse;if(rse[k]!==undefined&&el.textContent!==rse[k])el.textContent=rse[k];});
    const resources=RESOURCE_TEXT[code]||RESOURCE_TEXT.en;
    $('[data-resource-i18n]').forEach(el=>{const k=el.dataset.resourceI18n;if(resources[k]!==undefined&&el.textContent!==resources[k])el.textContent=resources[k];});

    const pageName=$('.page-name');
    if(pageName){
      const active=$('.cf-page.page-active');
      const ids=['home','company','vanilla-journey','rse','resources','boutique','quality','compliance','requests'];
      const i=ids.indexOf(active?.id); if(i>=0)pageName.textContent=d.page[i];
    }
    translateCartRows(d);
  }

  // Remove the unwanted floating option cards visible over the home page.
  const unwantedTitles=new Set([
    'Madagascar Vanilla','Supplier & Wholesale','Quality & Documents','Supplier Verification','About Challenge Food','Buyer Resource Center'
  ]);
  function removeUnwantedCards(){
    const matches = $$('body *').filter(el=>{
      const t=(el.textContent||'').trim();
      return unwantedTitles.has(t) ||
        t.includes('Buyer Resource Center') ||
        t.includes('Guides for pricing, import, export and supplier qualification');
    });

    matches.forEach(el=>{
      if(el.closest('#compliance,#boutique,#rse,#resources')) return;

      let node=el;
      let candidate=null;
      for(let i=0;i<7 && node && node!==document.body;i++,node=node.parentElement){
        const style=getComputedStyle(node);
        const rect=node.getBoundingClientRect();
        const looksFloating=(style.position==='fixed'||style.position==='absolute'||style.position==='sticky');
        const cardLike=node.matches('article,aside,[class*="card"],[class*="tile"],[class*="option"],[class*="resource"]');
        const saneSize=rect.width>120 && rect.width<700 && rect.height>120 && rect.height<900;
        if((looksFloating||cardLike) && saneSize) candidate=node;
      }
      const victim=candidate||el.closest('article,aside,[class*="card"],[class*="tile"],[class*="option"],[class*="resource"]');
      if(victim && !victim.closest('#compliance,#boutique,#rse,#resources')){
        victim.remove();
      }
    });
  }

  const select=$('#language-select');
  select?.addEventListener('change',()=>setTimeout(apply,0));
  document.addEventListener('cfood:language',apply);

  let mutationTimer=null;
  const observer=new MutationObserver(()=>{
    clearTimeout(mutationTimer);
    mutationTimer=setTimeout(()=>{
      removeUnwantedCards();
      const d=EXTRA[lang()]||EXTRA.en;
      applyProducts(d);
      translateCartRows(d);
    },30);
  });
  observer.observe(document.body,{childList:true,subtree:true});

  window.CFoodTranslate=apply;
  setTimeout(()=>{removeUnwantedCards();apply();},0);
  const cleanupTimer=setInterval(removeUnwantedCards,250);
  setTimeout(()=>clearInterval(cleanupTimer),8000);
  window.addEventListener('load',()=>{removeUnwantedCards();apply();},{once:true});
})();