const officeDetail = {
  dataAvailabilities: [],
  office: null,
  availabilitiesContent: null,
};

officeDetail.init = async function () {
  if (!app.currentId) {
    app.navigate("office");
    return;
  }
  officeDetail.availabilitiesContent = document.querySelector(
    "#container-list-detail tbody"
  );

  // AJAX
  const office = await app.controllers.office.get(app.currentId);
  officeDetail.dataAvailabilities = await app.controllers.officeAvailability
    .getAll()
    .catch(() => []);
  officeDetail.dataAvailabilities = officeDetail.dataAvailabilities.filter(
    (a) => a.officeId === app.currentId
  );

  document.querySelector("#card-office-detail .card-title").innerHTML =
    office.name;

  //RENDER TABLE
  officeDetail.renderTable();
};

officeDetail.goToEditOfficeAvailability = function (id) {
  app.secondCurrentId = id;
  app.navigate("office-availability");
};

officeDetail.renderTable = () => {
  let content = "";

  officeDetail.dataAvailabilities.forEach((e, index) => {
    content += `
        <tr>
            <td>${e.startDate}</td>
            <td>${e.endDate}</td>
            <td>${e.slotDuration}</td>
            <td>
                <button class="btn btn-primary" onclick="officeDetail.goToEditOfficeAvailability('${e.id}')">M</button>
                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalSuppAvaibility">S</button>

            <!-- Modal -->
                <div class="modal fade" id="modalSuppAvaibility" tabindex="-1" aria-labelledby="ModalSuppLabel" aria-hidden="true">
                    <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h1 class="modal-title fs-5" id="ModalSuppLabel">Suppression d'une disponibilité</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        Êtes vous sûr de vouloir supprimer la disponibilité:<br>

                            
                        Date de début: ${e.startDate}<br>
                        Date de fin: ${e.endDate}<br>

                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                                        <button class="btn btn-danger" onclick="officeDetail.remove(${index})" data-bs-dismiss="modal">Confirmer</button>
                        </div>
                    </div>
                    </div>
                </div>

            </td>
        </tr>
        `;
  });

  officeDetail.availabilitiesContent.innerHTML = content;
};

officeDetail.remove = async (index) => {
  const record = officeDetail.dataAvailabilities[index];
  if (record != null) {
    try {
      await $.ajax({
        type: "DELETE",
        url: `${app.api}/office-availability/${record.id}`,
      });
      officeDetail.dataAvailabilities.splice(index, 1);
      officeDetail.renderTable();
    } catch (e) {
      alert("Impossible de supprimer cette disponibilité !");
    }
  }
};

app.controllers.officeDetail = officeDetail;
