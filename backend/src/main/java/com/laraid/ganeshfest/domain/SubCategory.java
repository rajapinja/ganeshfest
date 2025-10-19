package com.laraid.ganeshfest.domain;

public enum SubCategory {

    CLAY(Category.IDOLS),
    ASBESTOS(Category.IDOLS),

    TIFFINS(Category.FOOD),
    MAIN_COURSE(Category.FOOD),

    KALASHAM(Category.POOJA),
    POOJAKIT(Category.POOJA),
    CAMPHOR(Category.POOJA),
    OIL(Category.POOJA),

    LOOSE(Category.FLOWERS),
    GARLAND(Category.FLOWERS),
    SMALL(Category.FLOWERS),
    MEDIUM(Category.FLOWERS),
    LARGE(Category.FLOWERS),
    GAZA(Category.FLOWERS),

    TENT(Category.TENT_HOUSE),
    CHAIRS(Category.TENT_HOUSE),
    TABLES(Category.TENT_HOUSE),
    CARPET(Category.TENT_HOUSE),
    UTENSILS(Category.TENT_HOUSE),
    SIDE_TENT(Category.TENT_HOUSE),

    DRUMS(Category.IMMERSION),
    DJ(Category.IMMERSION),
    DAPPULU(Category.IMMERSION),
    TRUCK(Category.IMMERSION);

    private final Category parent;

    SubCategory(Category parent) {
        this.parent = parent;
    }

    public Category getParent() {
        return parent;
    }
}

//ALTER TABLE product DROP CONSTRAINT product_category_check;
//
//ALTER TABLE product
//ADD CONSTRAINT product_category_check
//CHECK (
//    (category = 'IDOLS' AND sub_category IN ('CLAY', 'ASBESTOS'))
//	OR (category = 'FOOD' AND sub_category IN ('TIFFINS', 'MAIN_COURSE'))
// OR (category = 'POOJA' AND sub_category IN ('POOJAKIT','KALASHAM','CAMPHOR','OIL'))
//  OR (category = 'FLOWERS' AND sub_category IN ('GARLAND','LOOSE','SMALL','MEDIUM','LARGE','GAZA'))
//   OR (category = 'IMMERSION' AND sub_category IN ('DRUMS','DJ','DAPPULU','TRUCK'))
// OR (category = 'TENT_HOUSE' AND sub_category IN ('CARPET','CHAIRS','TABLES','UTENSILS','TENT','SIDE_TENT'))
// -- add others as needed
//);
