import { Platform, Dimensions } from 'react-native';
import moment from 'moment';
import { WHITE } from './constants';
import { uploadToAWS } from './api';

const { height } = Dimensions.get('window');

export const isAndroid = Platform.OS === 'android';

export const extraSmallScreen = height < 568;
export const smallScreen = height < 667;

/**
 * Validate param
 * @param {*} param
 */
export const validateparam = param => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(param).toLowerCase());
};

export const formattedDate = currDate => moment(currDate).fromNow(true);

export const sortNotificationsByDate = notifications =>
  notifications.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));

export const isPhoneNum = value => /^(\+?0?86\-?)?1[3-8][0-9]{9}$/.test(String(value));

export const isEmail = value => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value);

/** Capitalize the first letter of  each word in a string
 * @param str String
 * @return String
 */
export const titleCase = str => {
  const string = str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));

  return string.join(' ');
};

export const firstLetterCapital = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const projectStatusTextColor = status => {
  switch (status && status.toUpperCase()) {
    case 'DORMANT':
      return 'red';
    case 'ON GOING':
      return '#E06811';
    case 'PENDING':
      return '#E06811';
    case 'IN PROGRESS':
      return '#E06811';
    case 'DELAYED':
      return 'red';
    case 'COMPLETED':
      return '#369C05';
    case 'PROPOSED':
      return '#0B089D';
    case 'IN REVIEW':
      return WHITE;
    default:
      return '#369C05';
  }
};

const imageLocs = [
  require('../../assets/img/cleanup/cleanup_2.jpg'),
  require('../../assets/borehole.png'),
  require('../../assets/borehole-2.png'),
  require('../../assets/oilspill.png'),
];

export const getDummyDisplayPicture = name => {
  switch (name) {
    case 'Bodo clean up':
      return require('../../assets/img/cleanup/grass.jpg');
    case 'Ogoni Oil Clean up':
      return require('../../assets/img/cleanup/cleanup_3.jpg');
    case 'Cleanup K-Dere 2':
      return require('../../assets/img/cleanup/cleanup_3.jpg');
    case 'Aba Factory construction':
      return require('../../assets/img/cleanup/factory.jpg');
    case 'ABA FACTORY CONSTRUCTION':
      return require('../../assets/img/cleanup/factory.jpg');
    default:
      return require('../../assets/img/cleanup/cleanup_2.jpg');
  }
};

export const pictureRelatedToUser = name => {
  switch (name) {

    case 'Isaiah Udotong':
      return require('../../assets/factory_cleanup/isaiah_udotong.jpg');

    case 'Fidelia Nnandi':
      return require('../../assets/project_cleanup/fidelia_nnadi.jpg');


    case 'Collins Peter':
      return require('../../assets/man1.png');

    case 'Simi Olatopin':
      return require('../../assets/factory_cleanup/Simi_Olatopin.jpg');

    case 'Tunde Olatope':
      return require('../../assets/project_cleanup/Tunde_Olatope.jpg');


    case 'Carla Walker':
      return require('../../assets/factory_cleanup/carla_walker.jpeg');

    case 'Victoria Botvin':
      return require('../../assets/project_cleanup/victoria_botvin.jpg');


    case 'Sela ':
      return require('../../assets/goldlogo.png');
    case 'Sustainability International':
      return require('../../assets/sustainability_international_logo.png');
    case 'Dr Fidelia Nnandi':
      return require('../../assets/man2.png');
    case 'Releaf Nigeria':
      return require('../../assets/releaf_logo.png');
    case 'Admiral International':
      return require('../../assets/man1.png');
    default:
      return require('../../assets/man1.png');
  }
};

export const emptyProjectText = text => {
  switch (text) {
    case 'Projects you funded':
      return 'You haven\'t funded any project yet';
    case 'Projects you proposed':
      return 'You haven\'t proposed any project yet';
    case 'Projects that may interest you':
      return 'No project that under this category';
    case 'Saved Project':
      return 'You haven\'t saved any project yet';
    case 'Projects you were added to':
      return 'You haven\'t been added to any project yet';

    default:
      return require('../../assets/man1.png');
  }
}

export const tagsColor = tagsText => {
  switch (tagsText && tagsText.toUpperCase()) {
    case 'EDUCATION':
      return 'red';
    case 'ECONOMIC GROWTH':
      return '#E06811';
    case 'WATER & SANITATION':
      return '#369C05';
    case 'INFRASTRUCTURE':
      return '#0B089D';
    case 'NO POVERTY':
      return '#E3253C';
    case 'ZERO HUNGER':
      return '#DEA73A';
    case 'GOOD HEALTH AND WELL BEING':
      return '#4C9F45';
    case 'QUALITY EDUCATION':
      return '#C5202E';
    case 'GENDER EQUALITY':
      return '#F0412B';
    case 'CLEAN WATER AND SANITATION':
      return '#29BEE2';
    case 'AFFORDABLE AND CLEAN ENERGY':
      return '#FAC315';
    case 'DECENT WORK AND ECONOMIC GROWTH':
      return '#A21C44';
    case 'INDUSTRY,INNOVATION AND INFRASTRUCTURE':
      return '#F26A2C';
    case 'REDUCED INEQULAITIES':
      return '#DD1768';
    case 'SUSTAINABLE CITIES AND COMMUNITIES':
      return '#F99D27';
    case 'RESPONSIBLE CONSUMPTION AND PRODUCTION':
      return '#F99D27';
    case 'CLIMATE ACTION':
      return '#417F45';
    case 'LIFE BELOW WATER':
      return '#1C97D3';
    case 'LIFE ON LAND':
      return '#5DBB47';
    case 'PEACE,JUSTICE AND STRONG INSTITUTIONS':
      return '#06699E';
    case 'PARTERNSHIP FOR THE GOALS':
      return '#18486B';
    default:
      return '#369C05';
  }
};

export const uploadImageToAWS = async (avatarSource, cred) => {
  try {
    const file = {
      uri: avatarSource,
      name: 'image.png',
      type: 'image/png',
    };
    const resp = await uploadToAWS(file, null, cred);
    if (resp === false) {
      return 'https://placeimg.com/200/200/people';
    }

    return resp.postResponse.location;
  } catch (err) {
    return 'https://placeimg.com/200/200/people';
  }
};

const sdg = [
  {
    title: 'No Poverty',
    text: `1.1 By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $1.25 a day 
    1.2 By 2030,
     reduce at least by half the proportion of men, women and children of all ages living in poverty in all its dimensions according to national definitions
    1.3 Implement nationally appropriate social protection systems and measures for all, including floors, and by 2030 achieve substantial coverage of the poor and the vulnerable
    1.4 By 2030, ensure that all men and women, in particular the poor and the vulnerable, have equal rights to economic resources, as well as access to basic services, ownership and control over land and other forms of property, inheritance, natural resources, appropriate new technology and financial services, including microfinance
    1.5 By 2030, build the resilience of the poor and those in vulnerable situations and reduce their exposure and vulnerability to climate-related extreme events and other economic, social and environmental shocks and disasters
    1.A Ensure significant mobilization of resources from a variety of sources, including through enhanced development cooperation, in order to provide adequate and predictable means for developing countries, in particular least developed countries, to implement programmes and policies to end poverty in all its dimensions
    1.B Create sound policy frameworks at the national, regional and international levels, based on pro-poor and gender - sensitive development strategies, to support accelerated investment in poverty eradication actions`,
  },
  {
    title: 'Decent Work and Economic Growth',
    text: `8.1 Sustain per capita economic growth in accordance with national circumstances and, in particular, at least 7 per cent gross domestic product growth per annum in the least developed countries
            8.2 Achieve higher levels of economic productivity through diversification, technological upgrading and innovation, including through a focus on high-value added and labour-intensive sectors
            8.3 Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, creativity and innovation, and encourage the formalization and growth of micro-, small- and medium-sized enterprises, including through access to financial services
            8.4 Improve progressively, through 2030, global resource efficiency in consumption and production and endeavour to decouple economic growth from environmental degradation, in accordance with
            the 10-year framework of programmes on sustainable consumption and production, with developed countries taking the lead
            8.5 By 2030, achieve full and productive employment and decent work for all women and men, including for young people and persons with disabilities, and equal pay for work of equal value
            8.6 By 2020, substantially reduce the proportion of youth not in employment, education or training
            8.7 Take immediate and effective measures to eradicate forced labour, end modern slavery and human trafficking and secure the prohibition and elimination of the worst forms of child labour, including recruitment and use of child soldiers, and by 2025 end child labour in all its forms
            8.8 Protect labour rights and promote safe and secure working environments for all workers, including migrant workers, in particular women migrants, and those in precarious employment
            8.9 By 2030, devise and implement policies to promote sustainable tourism that creates jobs and promotes local culture and products
            8.10 Strengthen the capacity of domestic financial institutions to encourage and expand access to banking, insurance and financial services for all
            8.A Increase Aid for Trade support for developing countries, in particular least developed countries, including through the Enhanced Integrated Framework for Trade-Related Technical Assistance to Least Developed Countries
            8.B By 2020, develop and operationalize a global strategy for youth employment and implement the Global Jobs Pact of the International Labour Organization`,
  },
  {
    title: 'Good Health and Well-Being',
    text: `
    3.1 By 2030, reduce the global maternal mortality ratio to less than 70 per 100,000 live births.
    3.2 By 2030, end preventable deaths of newborns and children under 5 years of age, with all countries aiming to reduce neonatal mortality to at least as low as 12 per 1,000 live births and under-5 mortality to at least as low as 25 per 1,000 live births.
    3.3 By 2030, end the epidemics of AIDS, tuberculosis, malaria and neglected tropical diseases and combat hepatitis, water-borne diseases and other communicable diseases.
    3.4 By 2030, reduce by one third premature mortality from non-communicable diseases through
        prevention and treatment and promote mental health and well-being.
    3.5 Strengthen the prevention and treatment of substance abuse, including narcotic drug abuse and harmful use of alcohol.
    3.6 By 2020, halve the number of global deaths and injuries from road traffic accidents.
    3.7 By 2030, ensure universal access to sexual and reproductive health-care services, including for family planning, information and education, and the integration of reproductive health into national strategies and programmes.
    3.8 Achieve universal health coverage, including financial risk protection, access to quality essential health-care services and access to safe, effective, quality and affordable essential medicines and vaccines for all.
    3.9 By 2030, substantially reduce the number of deaths and illnesses from hazardous chemicals and air, water and soil pollution and contamination.
    3.A Strengthen the implementation of the World Health Organization Framework Convention on Tobacco Control in all countries, as appropriate.
    3.B Support the research and development of vaccines and medicines for the communicable and noncommunicable diseases that primarily affect developing countries, provide access to affordable essential medicines and vaccines, in accordance with the Doha Declaration on the TRIPS Agreement and Public Health, which affirms the right of developing countries to use to the full the 
        provisions in the Agreement on Trade Related Aspects of Intellectual Property Rights regarding flexibilities to protect public health, and, in particular, provide access to medicines for all.
    3.C Substantially increase health financing and the recruitment, development, training and retention of the health workforce in developing countries, especially in least developed countries and small island developing States.
    3.D Strengthen the capacity of all countries, in particular developing countries, for early warning, risk reduction and management of national and global health risks.
    `,
  },
  {
    title: 'Climate Action',
    text: `
    13.1 Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries
    13.2 Integrate climate change measures into national policies, strategies and planning
    13.3 Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning
    13.A Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 
         2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible
    13.B Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities
         Acknowledging that the United Nations Framework Convention on Climate Change is the primary international, intergovernmental forum for negotiating the global response to climate change.
`,
  },

  {
    title: 'Climate Action',
    text: `
    13.1 Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries
    13.2 Integrate climate change measures into national policies, strategies and planning
    13.3 Improve education, awareness-raising and human and institutional capacity on climate change mitigation, adaptation, impact reduction and early warning
    13.A Implement the commitment undertaken by developed-country parties to the United Nations Framework Convention on Climate Change to a goal of mobilizing jointly $100 billion annually by 
         2020 from all sources to address the needs of developing countries in the context of meaningful mitigation actions and transparency on implementation and fully operationalize the Green Climate Fund through its capitalization as soon as possible
    13.B Promote mechanisms for raising capacity for effective climate change-related planning and management in least developed countries and small island developing States, including focusing on women, youth and local and marginalized communities
         Acknowledging that the United Nations Framework Convention on Climate Change is the primary international, intergovernmental forum for negotiating the global response to climate change.
`,
  },
  {
    title: 'Life Below Water',
    text: `
    14.1 By 2025, prevent and significantly reduce marine pollution of all kinds, in particular from land-based activities, including marine debris and nutrient pollution
    14.2 By 2020, sustainably manage and protect marine and coastal ecosystems to avoid significant adverse impacts, including by strengthening their resilience, and take action for their restoration in order to achieve healthy and productive oceans
    14.3 Minimize and address the impacts of ocean acidification, including through enhanced scientific cooperation at all levels
    14.4 By 2020, effectively regulate harvesting and end overfishing, illegal, unreported and unregulated fishing and destructive fishing practices and implement science-based management plans, in order to restore fish stocks in the shortest time feasible, at least to levels that can produce maximum sustainable yield as determined by their biological characteristics
    14.5 By 2020, conserve at least 10 per cent of coastal and marine areas, consistent with national and international law and based on the best available scientific information
    14.6 By 2020, prohibit certain forms of fisheries subsidies which contribute to overcapacity and overfishing, eliminate subsidies that contribute to illegal, unreported and unregulated fishing and refrain from introducing new such subsidies, recognizing that appropriate and effective special and differential treatment for developing and least developed countries should be an integral part of the World Trade Organization fisheries subsidies negotiation
    14.7 By 2030, increase the economic benefits to Small Island developing States and least developed countries from the sustainable use of marine resources, including through sustainable management of fisheries, aquaculture and tourism
    14.A Increase scientific knowledge, develop research capacity and transfer marine technology, taking into account the Intergovernmental Oceanographic Commission Criteria and Guidelines on the Transfer of Marine Technology, in order to improve ocean health and to enhance the contribution of marine biodiversity to the development of developing countries, in particular small island developing States and least developed countries
    14.B Provide access for small-scale artisanal fishers to marine resources and markets
    14.C Enhance the conservation and sustainable use of oceans and their resources by implementing international law as reflected in UNCLOS, which provides the legal framework for the conservation and sustainable use of oceans and their resources, as recalled in paragraph 158  of The Future We Want
`,
  },

  {
    title: 'Clean Water and Sanitation',
    text: `
    6.1 By 2030, achieve universal and equitable access to safe and affordable drinking water for all
    6.2 By 2030, achieve access to adequate and equitable sanitation and hygiene for all and end open defecation, paying special attention to the needs of women and girls and those in vulnerable situations
    6.3 By 2030, improve water quality by reducing pollution, eliminating dumping and minimizing release of hazardous chemicals and materials, halving the proportion of untreated wastewater and substantially increasing recycling and safe reuse globally
    6.4 By 2030, substantially increase water-use efficiency across all sectors and ensure sustainable withdrawals and supply of freshwater to address water scarcity and substantially reduce the number of people suffering from water scarcity
    6.5 By 2030, implement integrated water resources management at all levels, including through transboundary cooperation as appropriate
    6.6 By 2020, protect and restore water-related ecosystems, including mountains, forests, wetlands, rivers, aquifers and lakes
    6.A By 2030, expand international cooperation and capacity-building support to developing countries in water- and sanitation-related activities and programmes, including water harvesting, desalination, water efficiency, wastewater treatment, recycling and reuse technologies
    6.B Support and strengthen the participation of local communities in improving water and sanitation management
`,
  },

];

export const tagText = val => {
  switch (val) {
    case require('../../assets/sdgs/SDG_6.png'):
      return sdg[6];
    case require('../../assets/sdgs/SDG_14.jpg'):
      return sdg[5];
    case require('../../assets/sdgs/SDG_13.png'):
      return sdg[3];
    case require('../../assets/sdgs/SDG_3.png'):
      return sdg[2];
    case require('../../assets/sdgs/SDG_1.png'):
      return sdg[0];
    case require('../../assets/sdgs/SDG_8.png'):
      return sdg[1];
    default:
      return sdg[1];
  }
}