
RegisterCommand('openMinigame', function()
    TriggerEvent('dodi_minigame_bar:Tip', "Acerte o alvo 3x pressionando [E]!", 2000)
    SetNuiFocus(true, false)

    SendNUIMessage({
        action = "openMinigame",
        hits = 3, -- Número de acertos necessários
        speeds = {1.9, 1.3, 1.0}, -- Velocidades por etapa
        successEvent = "minigameSuccess", -- Evento de sucesso
        failEvent = "minigameFail" -- Evento de falha
    })
end, false)

RegisterCommand('closeMinigame', function()
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = "closeMinigame"
    })

end, false)

RegisterNUICallback('closeMinigame', function(data, cb)
    SetNuiFocus(false, false)
    TriggerEvent(data.success and data.successEvent or data.failEvent)

    cb('ok')
end)

exports('startMinigame', function(hits, speeds, successEvent, failEvent)
    SetNuiFocus(true, false)

    SendNUIMessage({
        action = "openMinigame",
        hits = hits,
        speeds = speeds,
        successEvent = successEvent,
        failEvent = failEvent
    })
end)

-- Lidar com o resultado do minigame
RegisterNetEvent('minigameSuccess')
AddEventHandler('minigameSuccess', function()
    print('Minigame concluído com sucesso!')
        TriggerEvent('dodi_minigame_bar:Tip', "Você conseguiu!", 2000)
    -- Adicione aqui o que deve acontecer em caso de sucesso
end)

RegisterNetEvent('minigameFail')
AddEventHandler('minigameFail', function()
    print('Minigame falhou!')
    TriggerEvent('dodi_minigame_bar:Tip', "Perdeu!", 2000) 
    -- Adicione aqui o que deve acontecer em caso de falha
end)



---------------------------------------------------------------------------------------------
----------------------------------EXEMPLOS DE USO--------------------------------------------
---------------------------------EM OUTROS SCRIPTS-------------------------------------------
---------------------------------------------------------------------------------------------

-- Função para iniciar o minigame com múltiplas etapas, velocidades e eventos personalizados
function startMinigameExample()
    TriggerEvent('dodi_minigame_bar:Tip', "Acerte o alvo 3x pressionando [E]!", 2000)
    exports['dodi_minigame_bar']:startMinigame(3, {1.9, 1.3, 1.0}, 'meuEventoDeSucesso', 'meuEventoDeFalha') -- 3 etapas com velocidades diferentes e eventos personalizados
end

-- Exemplo de uso ao pressionar um comando ou evento
RegisterCommand('iniciarMinigame', function()
    startMinigameExample()
end, false)

-- Outra maneira de usar, como parte de um evento
RegisterNetEvent('usarMinigame')
AddEventHandler('usarMinigame', function()
    startMinigameExample()
end)

-- Eventos personalizados para lidar com o resultado do minigame
RegisterNetEvent('meuEventoDeSucesso')
AddEventHandler('meuEventoDeSucesso', function()
    print('Minigame personalizado concluído com sucesso!')
        TriggerEvent('dodi_minigame_bar:Tip', "Você conseguiu!", 2000) -- notificação personalizada
    -- Adicione aqui o que deve acontecer em caso de sucesso
end)

RegisterNetEvent('meuEventoDeFalha')
AddEventHandler('meuEventoDeFalha', function()
    print('Minigame personalizado falhou!')
    TriggerEvent('dodi_minigame_bar:Tip', "Perdeu!", 2000) -- notificação personalizada
    -- Adicione aqui o que deve acontecer em caso de falha
end)



-- =========NOTIFICATIONS=========--
-- =========NOTIFICATIONS=========--

RegisterNetEvent('dodi_minigame_bar:Tip')
AddEventHandler('dodi_minigame_bar:Tip', function(text, duration)
    exports.dodi_minigame_bar.ShowTooltip(0, tostring(text), tonumber(duration))
end)

exports("ShowTooltip",function(text, duration)
    local string = CreateVarString(10, "LITERAL_STRING", text)
    local Var0 = DataView.ArrayBuffer(8*7)
    local Var13 = DataView.ArrayBuffer(8*3)
    Var0:SetUint32(8*0,duration)
    Var0:SetInt32(8*1,0)
    Var0:SetInt32(8*2,0)
    Var0:SetInt32(8*3,0)
    -- struct1.setBigInt64(8, BigInt(sound_dict), true); -- Notification sound optional
    -- struct1.setBigInt64(16, BigInt(sound), true);
    Var13:SetUint64(8*1,bigInt(string))
    Citizen.InvokeNative(0x049D5C615BD38BAD,Var0:Buffer(),Var13:Buffer(),1)
end)

function bigInt(text)
    local string1 =  DataView.ArrayBuffer(16)
    string1:SetInt64(0,text)
    return string1:GetInt64(0)
end

RegisterNetEvent('dodi_minigame_bar:ShowTopNotification')
AddEventHandler('dodi_minigame_bar:ShowTopNotification',
                function(tittle, subtitle, duration)
    exports.dodi_minigame_bar:ShowTopNotification(tostring(tittle),
                                                    tostring(subtitle),
                                                    tonumber(duration))
end)

RegisterNetEvent('dodi_minigame_bar:ShowAdvancedRightNotification')
AddEventHandler('dodi_minigame_bar:ShowAdvancedRightNotification',
                function(text, dict, icon, text_color, duration)
    local _dict = dict
    local _icon = icon
    if not LoadTexture(_dict) then
        _dict = "honor_display "
        LoadTexture(_dict)
        _icon = "honor_bad"
    end
    exports.dodi_minigame_bar:ShowAdvancedRightNotification(tostring(text),
                                                              tostring(_dict),
                                                              tostring(_icon),
                                                              tostring(
                                                                  text_color),
                                                              tonumber(duration))
end)

function LoadTexture(dict)
    if Citizen.InvokeNative(0x7332461FC59EB7EC, dict) then
        RequestStreamedTextureDict(dict, true)
        while not HasStreamedTextureDictLoaded(dict) do Wait(1) end
        return true
    else
        return false
    end
end

function bigInt(text)
    local string1 = DataView.ArrayBuffer(16)
    string1:SetInt64(0, text)
    return string1:GetInt64(0)
end

exports("ShowTopNotification", function(title, subtext, duration)
    local struct1 = DataView.ArrayBuffer(8 * 7)
    struct1:SetInt32(8 * 0, duration)
    -- struct1:SetInt64(8*1,bigInt(sound_dict))
    -- struct1:SetInt64(8*2,bigInt(sound))
    local string1 = CreateVarString(10, "LITERAL_STRING", title)
    local string2 = CreateVarString(10, "LITERAL_STRING", subtext)
    local struct2 = DataView.ArrayBuffer(8 * 7)
    struct2:SetInt64(8 * 1, bigInt(string1))
    struct2:SetInt64(8 * 2, bigInt(string2))
    Citizen.InvokeNative(0xA6F4216AB10EB08E, struct1:Buffer(), struct2:Buffer(),
                         1, 1)
end)

exports("ShowAdvancedRightNotification",
        function(_text, _dict, icon, text_color, duration, quality)
    local text = CreateVarString(10, "LITERAL_STRING", _text)
    local dict = CreateVarString(10, "LITERAL_STRING", _dict)
    local sdict = CreateVarString(10, "LITERAL_STRING",
                                  "Transaction_Feed_Sounds")
    local sound = CreateVarString(10, "LITERAL_STRING", "Transaction_Positive")

    local struct1 = DataView.ArrayBuffer(8 * 7)
    struct1:SetInt32(8 * 0, duration)
    struct1:SetInt64(8 * 1, bigInt(sdict))
    struct1:SetInt64(8 * 2, bigInt(sound))

    local struct2 = DataView.ArrayBuffer(8 * 10)
    struct2:SetInt64(8 * 1, bigInt(text))
    struct2:SetInt64(8 * 2, bigInt(dict))
    struct2:SetInt64(8 * 3, bigInt(GetHashKey(icon)))
    struct2:SetInt64(8 * 5, bigInt(GetHashKey(text_color or "COLOR_ENEMY")))
    -- struct2:SetInt32(8*6,quality or 1)

    Citizen.InvokeNative(0xB249EBCB30DD88E0, struct1:Buffer(), struct2:Buffer(),
                         1)
end)
