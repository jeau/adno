export const exportToIIIF = (state) => {
    const {
        annotations,
        selectedProject,
        settings
    } = state
    // {
    //     "@context": "http://iiif.io/api/presentation/3/context.json",
    //     "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/manifest.json",
    //     "type": "Manifest",
    //     "label": {
    //       "en": [
    //         "Picture of Göttingen taken during the 2019 IIIF Conference"
    //       ]
    //     },
    //     "items": [
    //       {
    //         "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/canvas/p1",
    //         "type": "Canvas",
    //         "height": 3024,
    //         "width": 4032,
    //         "items": [
    //           {
    //             "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/page/p1/1",
    //             "type": "AnnotationPage",
    //             "items": [
    //               {
    //                 "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/annotation/p0001-image",
    //                 "type": "Annotation",
    //                 "motivation": "painting",
    //                 "body": {
    //                   "id": "https://iiif.io/api/image/3.0/example/reference/918ecd18c2592080851777620de9bcb5-gottingen/full/max/0/default.jpg",
    //                   "type": "Image",
    //                   "format": "image/jpeg",
    //                   "height": 3024,
    //                   "width": 4032,
    //                   "service": [
    //                     {
    //                       "id": "https://iiif.io/api/image/3.0/example/reference/918ecd18c2592080851777620de9bcb5-gottingen",
    //                       "profile": "level1",
    //                       "type": "ImageService3"
    //                     }
    //                   ]
    //                 },
    //                 "target": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/canvas/p1"
    //               }
    //             ]
    //           }
    //         ],
    //         "annotations": [
    //           {
    //             "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/page/p2/1",
    //             "type": "AnnotationPage",
    //             "items": [
    //               {
    //                 "id": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/annotation/p0002-svg",
    //                 "type": "Annotation",
    //                 "motivation": "tagging",
    //                 "body": {
    //                   "type": "TextualBody",
    //                   "value": "Gänseliesel-Brunnen",
    //                   "language": "de",
    //                   "format": "text/plain"
    //                 },
    //                 "target": {
    //                   "type": "SpecificResource",
    //                   "source": "https://iiif.io/api/cookbook/recipe/0261-non-rectangular-commenting/canvas/p1",
    //                   "selector": {
    //                     "type": "SvgSelector",
    //                     "value": "<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g><path d='M270.000000,1900.000000 L1530.000000,1900.000000 L1530.000000,1610.000000 L1315.000000,1300.000000 L1200.000000,986.000000 L904.000000,661.000000 L600.000000,986.000000 L500.000000,1300.000000 L270,1630 L270.000000,1900.000000' /></g></svg>"
    //                   }
    //                 }
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
}