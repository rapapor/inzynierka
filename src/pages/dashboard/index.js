import React from 'react';
import MainWrapper from './../../components/mainWrapper'
import CardStats from './../../containers/cardStats'
import CardComponent from './../../components/cardComponent'
import ChartStats from './../../containers/chartStats'
import CardTasks from './../../containers/cardTasks'

import './style.sass'
 
const dashboard = () => {
  return (
    <MainWrapper>
        <CardComponent label="dashboard" description="lorem ipsum">
          <div className="row">
            <CardStats icon="content_copy" type="warning" name="Zajęte nieruchomości" value="2/3" description='lorem ipsum'/>
            <CardStats icon="store" type="success" name="Zarobek" value="34,245 PLN" description='lorem ipsum'/>
            <CardStats icon="info_outline" type="danger" name="Rozwiązanych zadań" value="0/4" description='lorem ipsum'/>
            <CardStats icon="?" type="info" name="Coś tam" value="+11" description='lorem ipsum'/>
          </div>
          <div className="row">
            <ChartStats id="dailySalesChart" type="success" name="Zainteresowanie ogłoszeniami" value="" description="zaktualizowano 1h 4 min temu"/>
            <ChartStats id="websiteViewsChart" type="warning" name="Zgłoszone zadania" value="" description="zaktualizowano 36 min temu"/>
            <ChartStats id="completedTasksChart" type="info" name="Rozwiązane zadania" value="" description="zaktualizowano 18 min temu"/>
          </div>
          <div className="row">
            <CardTasks />
          </div>
        </CardComponent>
    </MainWrapper>
  )
}

export default dashboard