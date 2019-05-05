export const getCurrentPositionType = (types) => {
  let type, rate = ''
  switch(types) {
    case 'coldWater':
      type = 'COLD_WATER'
      rate = '14.36'
      break;
    case 'electricity':
      type = 'ELECTRICITY'
      rate = '0.62'
      break;
    case 'hotWater':
      type = 'HOT_WATER'
      rate = '28.36'
    break;
    case 'trash':
      type = 'TRASH'
      rate = '15'
    break;
    case 'repairFund':
      type = 'REPAIR_FOUND'
      rate = '1'
    break;
    case 'heating':
      type = 'HEATING'
      rate = '80'
    break;
    case 'commonPart':
      type = 'COMMON_PART'
      rate = '12'
    break;
    default:
      // code block
  }
  return {type, rate}
}
