Spawn = {
    isLoaded = false,
}

RegisterNuiCallback('isLoaded', function(_, cb)
    if Spawn.isLoaded then
        cb({
            isLoaded = false,
        })
    else
        Spawn.isLoaded = true

        cb({
            isLoaded = true,
            config = Config.UI,
        })
    end
end)

function Spawn:OpenSpawn(isNew)
    DoScreenFadeOut(0)
    SetNuiFocus(true, true)
    SendNUIMessage({
        eventName = 'openSpawn',
        payload = isNew and {
            apartments = Config.Apartments,
        } or {
            lastLocation = exports.qbx_core:GetPlayerData().position,
            properties = lib.callback.await('nf-spawn:server:getOwnedProperties', false),
        }
    })
end

exports('OpenSpawn', function(isNew)
    Spawn:OpenSpawn(isNew)
end)

RegisterCommand('spawn', function(source, args)
    if args[1] == 'new' then
        Spawn:OpenSpawn(true)
    else
        Spawn:OpenSpawn()
    end
end, false)


RegisterNuiCallback('selectApartment', function(payload, cb)
    SetNuiFocus(false, false)

    local apartment = Config.Apartments[payload]

    SetEntityCoords(PlayerPedId(), apartment.enter.x, apartment.enter.y, apartment.enter.z - 2.0, false, false, false,
        false)
    Citizen.Wait(100)
    TriggerServerEvent('qbx_properties:server:apartmentSelect', payload)


    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    Citizen.Wait(250)
    DoScreenFadeIn(250)

    cb(0)
end)

RegisterNuiCallback('spawnProperty', function(payload, cb)
    SetNuiFocus(false, false)

    SetEntityCoords(PlayerPedId(), payload.enter.x, payload.enter.y, payload.enter.z, false, false, false,
        false)
    Citizen.Wait(100)
    TriggerServerEvent('qbx_properties:server:enterProperty', payload)

    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    Citizen.Wait(250)
    DoScreenFadeIn(250)

    cb(0)
end)


RegisterNuiCallback('spawnAtLastLocation', function(payload, cb)
    SetNuiFocus(false, false)

    SetEntityCoords(PlayerPedId(), payload.x, payload.y, payload.z, false, false, false, false)
    SetEntityHeading(PlayerPedId(), payload.w)


    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')

    DoScreenFadeIn(150)

    cb(0)
end)
